import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/UserEntity';
import { UserPaymentsEntity } from './entities/UserPayments';
import { UserProfileEntity } from './entities/UserProfileEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserPaymentsEntity,
      UserProfileEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
