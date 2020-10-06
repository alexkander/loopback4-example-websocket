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
