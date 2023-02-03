import { forwardRef, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports:[TypeOrmModule.forFeature([Client]),forwardRef(() => UserModule),ProjectModule],
  controllers: [ClientController],
  providers: [ClientService,ClientModule],
  exports:[TypeOrmModule,ClientService]
})
export class ClientModule {}
