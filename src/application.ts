import { ApplicationConfig } from '@loopback/core';
import {
  WebsocketApplication,
  WebsocketBindings,
  ws,
} from '@loopback/websocket';

import path from 'path';
import express from 'express';
import { ChatController } from './ws-controllers';

@ws.controller('/ws/sample')
export class SampleController {}

export class WebsocketSampleApplication extends WebsocketApplication {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    const expressApp = express();
    const root = path.resolve(__dirname, '../public');
    expressApp.use('/', express.static(root));

    this.bind(WebsocketBindings.REQUEST_LISTENER).to(expressApp);

    this.websocketServer.route(ChatController);
  }
}
