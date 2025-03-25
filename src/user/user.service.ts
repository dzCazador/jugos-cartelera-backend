import { Injectable, NotFoundException,BadRequestException,UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginDto,UpdateUserDto} from './dto';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService, private readonly auth: AuthService) {}
  
  async create(createUserDto: CreateUserDto) {
      // Desestructuramos el Objeto
    const {email, password} = createUserDto

    // Buscamos el usuario si existe retornar error
    const user = await this.prismaService.user.findFirst({where: {email}})
    if (user) throw new BadRequestException('El correo ya está registrado')

    // Hasheamos la contraseña
    const hashedPassword = await this.auth.hashPassword(password)

    // Creamos el usuario
    const newUser = await this.prismaService.user.create({
                                   data: {...createUserDto, password: hashedPassword}})
    delete newUser['password']
    return newUser;    
   
  }

  async login(credential: LoginDto) {
    // Desestructuramos el Objeto
    const {email, password} = credential

    // Buscamos el usuario
    const user = await this.prismaService.user.findFirst({where: {email}})
    //Si no lo encuentra responde no encontrado
    if (!user) throw new UnauthorizedException('Usuario no Encontrado')
    //Comparamos password si no coincide responde Password Incorrecta
    const passwordOk = await this.auth.passwordCompare(password, user.password)
    if (!passwordOk) throw new UnauthorizedException('Password Incorrecta')
    // creamos el JWT a partir del usuario
    const token = this.auth.createJWT(user)
    // Eliminar las contrasenia del token
    delete user['password']
    return {token, user}
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    const user = this.prismaService.user.findFirst({where: {id}})
    if (!user) throw new NotFoundException('Usuario Inexistente')
    delete user['password']
    return user;
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
