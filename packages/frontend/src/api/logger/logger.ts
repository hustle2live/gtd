// import { AlertComponent } from '~/components/alert/alert.component';

interface ILogger {
	notify(message: string): void;
}

class Logger implements ILogger {

    // notifier: typeof AlertComponent = null;
	// constructor(notifier: typeof AlertComponent) {
	// 	this.notifier = notifier;
	// }

	notify(message: string): void {
		// this.notifier
		console.log(message);
	}
}

export const logger = new Logger();
