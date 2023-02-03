import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TeamService } from './../team/team.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateTeamDto } from '../team/dto/create-team.dto';
import { Profile } from './entities/profile.entity';
import { Project } from '../project/entities/project.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService,private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }


  // @Post(":id/profile/:id/team")
  // assignTeam(@Param() profileid : number,
  // @Param() projectid : number,
  // @Body() body : CreateTeamDto
  // ){
  //   this.teamService.create({
  //     ...CreateTeamDto,
  //     profile : {profileid} as Profile,
  //     project: {projectid} as Project
  //   })
  // }
}
