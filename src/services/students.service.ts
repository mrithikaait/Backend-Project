import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { IStudentService } from '../services/student-service.interface';

@Injectable()
export class StudentsService
  extends BaseService<string>
  implements IStudentService
{
  addStudent(name: string) {
    this.items.push(name); // 👈 using BaseService storage
    this.log('Student added'); // 👈 inherited log()
    return 'Student Added';
  }

  getStudents() {
    this.log('Getting students');
    return this.findAll(); // 👈 inherited findAll()
  }

  getHello() {
    return 'Hello mrithika';
  }
}
