import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateProfileDto } from '../profile/dto/update-profile.dto';
import { Team } from './entities/team.entity';
import { profile } from 'console';
import { ProfileService } from '../profile/profile.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService,private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }



  @Patch(':id/profile')
  async updateproject(@Param('id') id: string, @Body() updateTeaProfileDto: UpdateProfileDto) {
    
     const profile = await this.ProfileService.update({...UpdateProfileDto, team: {id} as Team}); // {id: id}
     return profile
  }



  @Patch(':id/project')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }
}
