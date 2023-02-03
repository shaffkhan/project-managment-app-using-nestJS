import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignationModule } from './modules/designation/designation.module';
import { ClientModule } from './modules/client/client.module';
import { TeamModule } from './modules/team/team.module';
import { ProjectModule } from './modules/project/project.module';
import { ProjectDocumentModule } from './modules/project-document/project-document.module';
import { TaskModule } from './modules/task/task.module';
import { ProjectCategoryModule } from './modules/project-category/project-category.module';
@Module({
  imports: [TeamModule,ProfileModule,DesignationModule, ClientModule,ProjectModule,ProjectDocumentModule,TaskModule,ProjectCategoryModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'chat',
    password: 'abcd123',
    database: 'project-mgmt',
    autoLoadEntities:true
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
