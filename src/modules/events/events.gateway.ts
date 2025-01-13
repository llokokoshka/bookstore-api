import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { userConnetionRepository } from './userConnection.repository';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private userConnetionRepository: userConnetionRepository) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  async handleConnection(client: Socket) {
    if (!client) {
      client.disconnect();
    }
    await this.userConnetionRepository.createConnection(client.id);
  }

  async handleDisconnect(client: Socket) {
    if (client) {
      await this.userConnetionRepository.removeConnection(client.id);
    }
  }

  async sendData(ids: string | string[], payload: any, messageName: string) {
    if (messageName && ids && payload) {
      this.server.to(ids).emit(messageName, payload);
    }
  }
}
