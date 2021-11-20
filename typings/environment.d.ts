declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REDDITS_TO_SCRAPE: string;
			DISCORD_WEBHOOK: string;
			SENTRY_DSN: string;
		}
	}
}

export {}