import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}
  
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({data: createUserDto});
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findFirst({where: {id}})
    ;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {    
    const user = await this.prismaService.user.findFirst({where: {id}})
    if (!user) throw new NotFoundException('Usuario Inexistente')
    const result = await this.prismaService.user.update(
                              {where:{id},
                              data: updateUserDto})
    return result
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({where: {id}})
  }
}
