import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔹 REGISTER API
  @Post('register')
  register(@Body() body) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  // 🔹 LOGIN API
  @Post('login')
  login(@Body() body) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}