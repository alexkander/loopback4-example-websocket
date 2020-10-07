import { Application, ApplicationConfig } from '@loopback/core';
import {
  WebsocketBindings,
  WebsocketComponent,
  WebsocketServer,
  ws,
} from '@loopback/websocket';

import path from 'path';
import express from 'express';
import { ChatController } from './ws-controllers';

@ws.controller('/ws/sample')
export class SampleController {}

export class WebsocketSampleApplication extends Application {
  public readonly wsServer: WebsocketServer;
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(WebsocketComponent);

    const expressApp = express();
    const root = path.resolve(__dirname, '../public');
    expressApp.use('/', express.static(root));

    this.bind(WebsocketBindings.REQUEST_LISTENER).to(expressApp);

    this.wsServer = this.getSync(WebsocketBindings.SERVER);

    this.wsServer.route(ChatController);
  }
  async start() {
    await this.wsServer.start();
  }
  async stop() {
    await this.wsServer.stop();
  }
}
