import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Task]),TaskModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TypeOrmModule,TaskModule]
})
export class TaskModule {}
