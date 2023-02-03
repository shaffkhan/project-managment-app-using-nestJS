import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileModule } from '../profile/profile.module';
import { ClientModule } from '../client/client.module';
import { UserService } from './user.service';
import { ProfileService } from '../profile/profile.service';

@Module({
  imports : [TypeOrmModule.forFeature([User]),ClientModule,forwardRef(() => ProfileModule)],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
