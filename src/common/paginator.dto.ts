import {IsNumber,IsOptional} from 'class-validator'
import {Type} from 'class-transformer'

export class PaginatorDto{
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page: number

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    perPage: number

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number
}