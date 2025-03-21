import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Request } from 'express';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // Crear un mensaje (solo para ADMIN)
  @Post()
  async createMessage(@Body() data: { content: string; isPublic: boolean }, @Req() req: Request) {
    const userId = req.user.id; // Suponiendo que el ID del usuario está en el token JWT
    return this.messageService.createMessage({ ...data, userId });
  }

  // Obtener todos los mensajes (solo para ADMIN)
  @Get('all')
  async getAllMessages(@Req() req: Request) {
    const userId = req.user.id; // Suponiendo que el ID del usuario está en el token JWT
    return this.messageService.getAllMessages(userId);
  }

  // Obtener mensajes públicos (para todos los usuarios)
  @Get('public')
  async getPublicMessages() {
    return this.messageService.getPublicMessages();
  }

  // Obtener mensajes privados del usuario logueado (para USER)
  @Get('private')
  async getPrivateMessages(@Req() req: Request) {
    const userId = req.user.id; // Suponiendo que el ID del usuario está en el token JWT
    return this.messageService.getPrivateMessages(userId);
  }
}