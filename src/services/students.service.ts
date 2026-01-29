import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { IStudentService } from '../services/student-service.interface';

@Injectable()
export class StudentsService
  extends BaseService<string>
  implements IStudentService
{
  addStudent(name: string) {
    this.items.push(name); 
    this.log('Student added'); 
    return 'Student Added';
  }

  getStudents() {
    this.log('Getting students');
    return this.findAll(); 
  }

  getHello() {
    return 'Hello mrithika';
  }
}
