import 'dotenv/config';
import {JwtModuleOptions} from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: {
    //@ts-ignore
    expiresIn: process.env.JWT_EXPIRES_IN
  },
}





