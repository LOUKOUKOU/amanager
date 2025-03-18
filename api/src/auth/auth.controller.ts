import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/metadata';
import { CreateAdminUserDto } from 'src/users/dto/create-user.dto';
import { RegisterGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * **Admin**
   * create user ⇒ create profile ⇒ create organisation ⇒ link profile to organisation
   */

  @UseGuards(RegisterGuard)
  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateAdminUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
