import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsNumber, IsPositive,IsOptional} from 'class-validator'
import {Type} from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber() //Es un numero
    @IsPositive() // Positovo
    @IsOptional() // Opcional
    @Type(() => Number)
    @ApiProperty()
    id?: number;
}
