import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../intities/user.schema';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dtos/User.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() { username, password }: UserDto): Promise<User> {
    return this.userService.register(username, password);
  }

  @Post('login')
  async login(@Body() { username, password }: UserDto) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // console.log('Plain password:', password);
    // console.log('Hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username, sub: user._id };
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET')!;
    const token = jwt.sign(payload, JWT_SECRET);

    return { access_token: token };
  }
}
