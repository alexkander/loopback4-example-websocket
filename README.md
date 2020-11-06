# ARCHIVED
Please use [@loopback/example-socketio](https://www.npmjs.com/package/@loopback/example-socketio) in the main repo [loopback-next](https://github.com/strongloop/loopback-next)

# @loopback/example-websocket

This example is created to explore how to expose Websocket [(socket.io)](https://socket.io) endpoints
in conjunction with LoopBack 4 controllers through `@loopback/example-websocket`.

Similarly as @loopback/rest, each websocket server is attached to an http/https
server. WebSocket controllers are mapped to different routes (namespaces), for
example:

/admins -> AdminController
/chats -> ChatController

When a client connects to the endpoint, a controller is instantiated upon the
`connection` event of the namespace with the `socket` object. Controller methods
can subscribe to one or more message types and send messages to one or more clients.

Each `socket` can join/leave rooms. Rooms are used to group/tag clients for messaging
purposes.

Middleware can be registered at global and namespace level.

## Basic use

```
npm install
npm start
Open your browser to http://localhost:3000
```

## Websocket controllers

```ts
import { Socket } from 'socket.io';
import { ws } from '@loopback/websocket';

@ws.controller('/ws/chat')
export class ChatController {
  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  connect(@ws.socket() socket: Socket) {
    console.log('Client connected: %s', socket.id);
    socket.join('room 1');
  }

  /**
   * Register a handler for 'chat message' events
   * @param msg
   * @param socket
   */
  @ws.subscribe('chat message')
  handleChatMessage(msg: unknown, @ws.socket() socket: Socket) {
    console.log('Chat message: %s', msg);
    socket.nsp.emit('chat message', `[${socket.id}] ${msg}`);
  }

  /**
   * Register a handler for all events
   * @param args
   */
  @ws.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    console.log('Message: %s', args);
  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @ws.disconnect()
  disconnect(@ws.socket() socket: Socket) {
    console.log('Client disconnected: %s', socket.id);
  }
}

```

## References
- https://github.com/raymondfeng/loopback4-example-websocket/

## Contributions

- [Guidelines](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [Join the team](https://github.com/strongloop/loopback-next/issues/110)

## Tests

Run `npm test` from the root folder.

## Contributors

See
[all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## License

MIT
