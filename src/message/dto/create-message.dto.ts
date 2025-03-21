import { IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string; // Contenido del mensaje

  @IsBoolean()
  isPublic: boolean; // Indica si el mensaje es público o privado

  @IsInt()
  userId: number; // ID del usuario que crea el mensaje
}
