import { IsEmail, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string; // El email debe ser válido

  @IsOptional()
  @IsString()
  name?: string; // El nombre es opcional

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string; // La contraseña debe tener al menos 6 caracteres

  @IsOptional()
  @IsEnum(Role, { message: 'El rol debe ser uno de los valores válidos: ADMIN, USER' })
  role?: Role; // El rol es opcional y debe ser uno de los valores del enum Role
}