import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../schema/roles.schema';
import { User, UserSchema } from '../schema/user.schema';
import { RoleSeed } from '../seed/role.seed';
import { UserSeed } from '../seed/user.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [RoleSeed, UserSeed],
  exports: [RoleSeed, UserSeed],
})
export class SeedModule {}
