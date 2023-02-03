import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), TeamModule],
  controllers: [ TeamController],
  providers: [TeamService, TeamModule],
  exports:[TeamService]
})
export class TeamModule {}
