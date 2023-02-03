import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProfileService {
    //first create this constructor
constructor(@InjectRepository(Profile) private repository:Repository<Profile>){}


  async create(createProfileDto: CreateProfileDto) {
    // this.repository.create({CreateUserDto,User})
     const user1 = await this.repository.save(createProfileDto);
     return user1;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const profile = await this.repository.findOne({where:{id:id}});
    return profile;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

 async remove(id: number) {
   await this.repository.delete(id) ;
   return `user with id : ${id} is deleted successfully!!!`
  }
}
