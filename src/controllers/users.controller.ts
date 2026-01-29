import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST http://localhost:3000/users
  @Post()
  createUser(@Body() body: any) {
    return this.usersService.create(body);
  }

  // GET http://localhost:3000/users
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
