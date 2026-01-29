import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'mySecretKey', // later env file use pannalaam
      signOptions: { expiresIn: '1d' }, // token valid for 1 day
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
