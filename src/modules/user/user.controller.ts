import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { ProfileService } from '../profile/profile.service';
import { ClientService } from '../client/client.service';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly ProfileService :ProfileService, private readonly ClientService:ClientService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const email = this.userService.findByEmail(createUserDto.email);
    // if(email){
    //   throw new BadRequestException("this email already exists !!!! plz try another ")
    // }
  const user = await this.userService.create(createUserDto);

  

  if(createUserDto.role === Role.client) 
  {
    const client = await this.ClientService.create({
      ...createUserDto.client,
       user,
    })
console.log(client);
    return {
      ...user,
      client,
      profile : null
    }
   
  }
  else{
    const profile = await this.ProfileService.create({ 
      ...createUserDto.profile,
      user,
    });


    
    return {
      ...User,
      profile
    }
  }
}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
