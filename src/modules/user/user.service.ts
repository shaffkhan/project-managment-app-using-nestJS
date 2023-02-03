import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  //first create this constructor
constructor(@InjectRepository(User) private repository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.repository.save(createUserDto)
    return user;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const user= await this.repository.findOne({
      where:{
       id : id
      }
    });
    return user;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    return "hahaha";
  }
  
  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return "deleted successfully!!!!";
  }
}
