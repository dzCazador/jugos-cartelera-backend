import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {envs} from '../../configuration'
import { PayloadInterface } from 'src/common';
import { UserService } from '../user.service';

@Injectable()
export class JWTPassport extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,  // If the token is expired, it will not be rejected
            secretOrKey: envs.secredKey,
        });
    }
    async validate(payload:PayloadInterface){
        try {
            return await this.userService.findOne(+payload.sub);
        } catch(err){
            throw new UnauthorizedException('User not found on Token'+ err)
        }
    }
}