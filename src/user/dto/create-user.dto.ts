import { IsEmail, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string; // El email debe ser válido

  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string; // El nombre es opcional

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @ApiProperty()
  password: string; // La contraseña debe tener al menos 6 caracteres

  @IsOptional()
  @IsEnum(Role, { message: 'El rol debe ser uno de los valores válidos: ADMIN, USER' })
  @ApiProperty()
  role?: Role; // El rol es opcional y debe ser uno de los valores del enum Role
}