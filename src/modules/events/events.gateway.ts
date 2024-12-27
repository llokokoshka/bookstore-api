import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, @MessageBody() payload: { bookId: string }) {
    console.log(`Client ${client.id} joined room ${payload.bookId}`);
    client.join(payload.bookId);
  }

  @SubscribeMessage('addComment')
  handleAddComment(
    client: Socket,
    @MessageBody() payload: { bookId: string; comment: string },
  ) {
    console.log(`New comment on book ${payload.bookId}: ${payload.comment}`);
    const commentId = Date.now().toString();
    const response = {
      commentId,
      text: payload.comment,
      dateOfCreate: Date.now().toString(),
      bookId: payload.bookId,
      userId: client.id,
    };
    this.server.to(payload.bookId).emit('newComment', response);
  }
}
