import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
@Injectable()
export class ClientService {

    //first create this constructor
constructor(@InjectRepository(Client) private repository:Repository<Client>){}


  async create(createClientDto: CreateClientDto) {
   const client = await this.repository.save(createClientDto);
   return client;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number , relations=[]) {
    const client = await this.repository.find({where:{id}, relations});
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    this.repository.delete(id);
    return "deleted client successfully!!!";
  }
}
