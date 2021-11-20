import { load } from "dotenv-extended";
import * as Sentry from "@sentry/node";

load();

export default function init() {
	Sentry.init({
		tracesSampleRate: 1,
		dsn: process.env.SENTRY_DSN
	});

	return {
		...Sentry,

		captureWithExtras: (error: any, extras: Record<string, any>) => {
			Sentry.withScope((scope) => {
				Object.entries(extras).forEach(([key, value]) => scope.setExtra(key, value));
				return Sentry.captureException(error);
			});
		}
	};
}