import { IsString, IsBoolean, IsInt,IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMessageDto {
  @IsString()
  content: string; // Contenido del mensaje

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true || value === 1) {
      return true;
    } else {
      return false;
    }
  })
  isPublic: boolean; // Indica si el mensaje es público o privado

  @IsInt()
  @Transform(({ value }) => parseInt(value)) // Convertir a número entero
  userId: number; // ID del usuario que crea el mensaje

  @IsOptional()
  @IsString()
  file?: string;
}
