import { WebsocketSampleApplication } from './application';

export async function main() {
  try {
    const app = new WebsocketSampleApplication({
      websocket: {
        server: {
          host: '127.0.0.1',
          port: 0,
        },
        options: {},
      },
    });
    await app.start();
    console.log(`Server is running at ${app.websocketServer.url}`);
  } catch (err) {
    console.error('Cannot start the application.', err);
    process.exit(1);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
