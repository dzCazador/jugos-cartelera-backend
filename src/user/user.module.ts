import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import {JWTPassport} from './auth/jwt.passport'
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import {envs} from '../configuration'


@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, JWTPassport,PrismaService],
  imports: [JwtModule.register({
    
    secret: envs.secredKey,
    signOptions: { expiresIn: '24h' },
  }),
  PrismaModule
  ]  
})
export class UserModule {}
