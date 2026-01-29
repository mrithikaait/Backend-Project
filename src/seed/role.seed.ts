import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../schema/roles.schema';

@Injectable()
export class RoleSeed {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<Role>,
  ) {}

  async seedRoles() {
    const roles = ['ADMIN', 'USER'];

    for (const role of roles) {
      const exists = await this.roleModel.findOne({ name: role });
      if (!exists) {
        await this.roleModel.create({ name: role });
        console.log(`Role ${role} created`);
      }
    }
  }
}
