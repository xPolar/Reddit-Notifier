import petitio from "petitio";
import { load } from "dotenv-extended";
import Logger from "../lib/classes/Logger.js";
import { NewPosts } from "../typings/index.js";
import { format } from "util";
import { truncate } from "fs";

load();

let lastPostId: Record<string, string> = {};
const redditsToScrape = process.env.REDDITS_TO_SCRAPE.split(",");

setInterval(async () => {
	for (let i = 0; i < redditsToScrape.length; i++) {
		const response = await petitio(
			`https://www.reddit.com/r/${redditsToScrape[i]}/new.json?limit=1&raw_json=1&sr_detail=1`
		).send();
		const posts: NewPosts = JSON.parse(response.text());
		Logger.info(`Scraped r/${redditsToScrape[i]} and got status code ${response.statusCode}.`);
		for (let x = 0; x < posts.data.children.length; x++) {
			const post = posts.data.children[x]!;
			if (
				post.data.id === lastPostId[post.data.subreddit_name_prefixed] ||
				post.data.over_18
			) {
				Logger.info(
					`I've already posted ${post.data.id} ${post.data.subreddit_name_prefixed}`
				);
				continue;
			}
			lastPostId[post.data.subreddit_name_prefixed] = post.data.id;
			Logger.info(`Found new post ${post.data.id} in ${post.data.subreddit_name_prefixed}!`);
			const r = await petitio(process.env.DISCORD_WEBHOOK, "POST")
				.body({
					username: post.data.subreddit_name_prefixed,
					embeds: [
						{
							author: {
								name: `u/${post.data.author}`,
								url: `https://reddit.com/u/${post.data.author}`
							},
							title: trunc(post.data.title, 256),
							url: post.data.url,
							description: trunc(post.data.selftext, 4000),
							color: parseInt("FF3F18", 16),
							image: post.data.preview
								? post.data.preview.images[0]!.source.url
								: undefined
						}
					]
				})
				.send();
			if (r.statusCode !== 204) {
				Logger.error(`Discord returned ${r.statusCode} ${r.text()}`);
				Logger.sentry.captureWithExtras(new Error("Failed to send Discord webhook."), {
					"Status Code": r.statusCode,
					"Sub Reddit": post.data.subreddit_name_prefixed,
					Post: format(post)
				});
			} else {
				Logger.info(
					`Successfully sent webhook for post ${post.data.id} in ${post.data.subreddit_name_prefixed}.`
				);
			}
		}
	}
}, 5000);

function trunc(string: string, maxLength: number): string {
	if (string.length > maxLength) {
		return `${string.substring(0, maxLength - 3)}...`
	}
	return string;
}