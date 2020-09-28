import {ApplicationConfig} from "@loopback/core";
import {WebsocketApplication, WebsocketBindings, ws} from "@loopback/websocket";
import path from "path";
import express from 'express';

@ws.controller('/ws/sample')
export class SampleController {

}

export class SampleApplication extends WebsocketApplication {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    const expressApp = express();
    const root = path.resolve(__dirname, '../public');
    expressApp.use('/', express.static(root));

    this.bind(WebsocketBindings.REQUEST_LISTENER).to(expressApp);

    this.websocketServer.controller(SampleController)
  }
}

export async function main() {
  try {
    const app = new SampleApplication({
      websocket: {
        server:{
          host: '127.0.0.1',
          port: 0,
        },
        options: {
        }
      },
    });
    await app.start();
    console.log(`Server is running at ${app.websocketServer.url}`);
  } catch (err) {
    console.error('Cannot start the application.', err);
    process.exit(1);
  }
}

main();