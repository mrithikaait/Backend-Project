import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentsService } from '../services/students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  hello() {
    return this.studentsService.getHello();
  }
  @Post()
  add(@Body('name') name: string) {
    return this.studentsService.addStudent(name);
  }

  @Get()
  getAll() {
    return this.studentsService.getStudents();
  }
}
