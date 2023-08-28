import 'dotenv/config';
import { Server, Database } from './lib';

(async () => {
	await Server.start();
	await Database.connect();
})();

process.on('uncaughtException', (err) => {
	console.log('\x1b[33m Uncaught exception catch: ', '\x1b[0m', err);
});
