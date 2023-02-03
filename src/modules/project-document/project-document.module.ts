import { Module } from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';
import { ProjectDocumentController } from './project-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project_doc } from './entities/project-document.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project_doc]),ProjectDocumentModule],
  controllers: [ProjectDocumentController],
  providers: [ProjectDocumentService],
  exports:[TypeOrmModule,ProjectDocumentModule]
})
export class ProjectDocumentModule {}
