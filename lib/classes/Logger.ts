import {
	bgGreenBright,
	bgMagentaBright,
	bgRedBright,
	bgYellowBright,
	blackBright,
	bold
} from "colorette";
import { format } from "util";
import init from "../utilities/sentry.js";

class Logger {
	public sentry;

	constructor() {
		this.sentry = init();
	}

	private get timestamp(): string {
		const now = new Date();
		const [year, month, day] = now.toISOString().substr(0, 10).split("-");
		return `${day}/${month}/${year} @ ${now.toISOString().substr(11, 8)}`;
	}

	public debug(...args: string | any) {
		console.log(bold(bgMagentaBright(`[${this.timestamp}]`)), bold(format(...args)));
	}

	public info(...args: string | any) {
		console.log(bold(bgGreenBright(blackBright(`[${this.timestamp}]`))), bold(format(...args)));
	}

	public warn(...args: string | any) {
		console.log(bold(bgYellowBright(blackBright(`[${this.timestamp}]`))), bold(format(...args)));
	}

	public error(error: unknown, ...args: string | any) {
		console.log(bold(bgRedBright(`[${this.timestamp}]`)), error, bold(format(...args)));
	}
}

export default new Logger();