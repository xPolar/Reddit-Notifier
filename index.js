const request = require("request");
const { MessageEmbed, WebhookClient } = require("discord.js");
const { redditToScrape, webhookID, webhookToken } = require("./data.json");

let lastPost = null;
const webhookClient = new WebhookClient(webhookID, webhookToken);

setInterval(() => {
    request(`https://reddit.com/r/${redditToScrape}/new.json?limit=1`, async (error, _, body) => {
        if (error) throw error;

        const data = JSON.parse(body).data.children[0].data;
        if (
            lastPost === data.id ||
            (data.link_flair_richtext[0]?.t?.toLowerCase() !== "hiring" &&
                data.link_flair_richtext[0] !== undefined)
        )
            return;
        const embed = new MessageEmbed()
            .setAuthor(`u/${data.author}`, null, `https://reddit.com/u/${data.author}`)
            .setTitle(data.title)
            .setURL(data.url)
            .setDescription(data.selftext)
            .setColor("#FF3F18");
        await webhookClient.send(embed);
        lastPost = data.id;
    });
}, 3000);
