const request = require("request");
const { writeFile } = require("fs");
const { MessageEmbed, WebhookClient } = require("discord.js");
const { lastPost, redditToScrape, webhookID, webhookToken } = require("./data.json");

setInterval(() => {
    request(`https://reddit.com/r/${redditToScrape}/new.json?limit=1`, async (error, _, body) => {
        if (error) throw error;

        const data = JSON.parse(body).data.children[0].data;
        if (lastPost === data.id || (data.link_flair_richtext[0]?.t?.toLowerCase() !== "hiring" && data.link_flair_richtext[0] !== undefined)) return;
        const webhookClient = new WebhookClient(webhookID, webhookToken);
        const embed = new MessageEmbed()
            .setAuthor(`u/${data.author}`, null, `https://reddit.com/u/${data.author}`)
            .setTitle(data.title)
            .setURL(data.url)
            .setDescription(data.selftext)
            .setColor("#FF3F18");
        await webhookClient.send(embed);
        return writeFile(
            "./data.json",
            JSON.stringify(
                {
                    lastPost: data.id,
                    redditToScrape: redditToScrape,
                    webhookID: webhookID,
                    webhookToken: webhookToken
                },
                null,
                4
            ),
            (err) => {
                if (err) throw err;
            }
        );
    });
}, 2000);
