import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 🔹 REGISTER
  async register(name: string, email: string, password: string) {
    try {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.usersService.create({
        name,
        email,
        password: hashedPassword,
      });

      return { message: 'User registered successfully', user };
    }
     catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  async login(email: string, password: string) {
    try {

      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new BadRequestException('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid email or password');
      }

      const payload = {
        id: user._id,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  }
