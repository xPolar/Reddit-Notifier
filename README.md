# Reddit-Notifier

Scrape posts off of subreddits and post them into a Discord channel through a webhook.

## Setup

To set this system up please fill in the the `.env` file with what subreddits you want to scrape as well as the Discord webhook. (Sentry DSN is optional, good for error handling).
Once set up it should look like the following.

```.env
REDDITS_TO_SCRAPE=REDDIT1,REDDIT2,REDDIT3
DISCORD_WEBHOOK=https://discord.com/api/webhooks/webhookId/webhookToken
SENTRY_DSN="https://something@something.ingest.sentry.io/something"
```

Once your .env is filled make sure to run `npm i`, then to build and run our TypeScript we can run `npm run build`, this will compile our TypeScript and then run it.
If you want to just run out compiled TypeScript run `npm run start`.

## Join The Following Server For Support

[![widget](https://inv.wtf/widget/polar)](https://inv.wtf/polar)
