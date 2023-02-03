import { Module } from '@nestjs/common';
import { ProjectCategoryService } from './project-category.service';
import { ProjectCategoryController } from './project-category.controller';
import { ProjectCategory } from './entities/project-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectCategory]),ProjectCategoryModule],
  controllers: [ProjectCategoryController],
  providers: [ProjectCategoryService],
  exports:[TypeOrmModule,ProjectCategoryModule]
})
export class ProjectCategoryModule {}
