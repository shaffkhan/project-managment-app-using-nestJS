import { Module } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import { Designation } from './entities/designation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Designation]),DesignationModule],
  controllers: [DesignationController],
  providers: [DesignationService,DesignationModule],
  exports: [TypeOrmModule,DesignationModule]
})
export class DesignationModule {}
