import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';
import { Role } from '../schema/roles.schema';

@Injectable()
export class UserSeed {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Role.name)
    private roleModel: Model<Role>,
  ) {}

  async seedUsers() {
    const adminRole = await this.roleModel.findOne({ name: 'ADMIN' });

    if (!adminRole) {
      console.log('ADMIN role not found. Please seed roles first.');
      return;
    }

    const adminExists = await this.userModel.findOne({
      email: 'admin@gmail.com',
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await this.userModel.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: adminRole._id,
      });

      console.log('Admin user created');
    }
  }
}
