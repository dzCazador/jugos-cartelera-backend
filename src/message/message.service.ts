import { CreateMessageDto } from './dto/create-message.dto';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  // Crear un mensaje (solo para usuarios con rol ADMIN)
  async createMessage(createMessageDto:CreateMessageDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== Role.ADMIN) {
      throw new Error('Solo los administradores pueden crear mensajes');
    }
    return this.prisma.message.create({data: {...createMessageDto}} );
  }

  // Obtener todos los mensajes (solo para usuarios con rol ADMIN)
  async getAllMessages(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== Role.ADMIN) {
      throw new Error('Solo los administradores pueden ver todos los mensajes');
    }
    return this.prisma.message.findMany();
  }

  // Obtener mensajes públicos (para todos los usuarios)
  async getPublicMessages() {
    return this.prisma.message.findMany({
      where: { isPublic: true },
    });
  }

  // Obtener mensajes privados del usuario logueado (para usuarios con rol USER)
  async getPrivateMessages(userId: number) {
    return this.prisma.message.findMany({
      where: { isPublic: false, userId },
    });
  }
}