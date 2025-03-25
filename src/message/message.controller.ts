import { Controller, Get, Post, Body, Req,UseGuards,UseInterceptors,UploadedFile  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';


@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // Crear un mensaje (solo para ADMIN)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))  
  async createMessage(@Body() createMessageDto: CreateMessageDto, 
                      @Req() req: any,
                      @UploadedFile() file: Express.Multer.File) {
    const userId = req.user.id; // Suponiendo que el ID del usuario está en el token JWT
    const filePath = file ? file.path : null; // Ruta del archivo subido
    return this.messageService.createMessage({...createMessageDto,file:filePath}, userId);
  }

  // Obtener mensajes públicos (para todos los usuarios)
  @Get('public')
  async getPublicMessages() {
    return this.messageService.getPublicMessages();
  }

  // Obtener mensajes privados del usuario logueado (para USER)
  @Get('private')
  @UseGuards(AuthGuard('jwt'))
  async getPrivateMessages(@Req() req: any) {
    const userId = req.user.id; // Suponiendo que el ID del usuario está en el token JWT
    return this.messageService.getPrivateMessages(userId);
  }
}