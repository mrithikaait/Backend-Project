import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  createUser(@Body() body: any) {
    return this.usersService.create(body);
  }

  
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
