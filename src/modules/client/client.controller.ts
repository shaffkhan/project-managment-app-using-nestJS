import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProjectDto } from '../project/dto/create-project.dto';
import { ProjectService } from '../project/project.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService, private readonly projectService : ProjectService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }


  @Get(':id/projects')
  async listProjects(@Param('id') id: number) {
    const client = await this.clientService.findOne(id, ['projects']);
    return client;
  }
  
  @Post(':id/projects')
  async addProject(
    @Param('id') id: number,
    @Body() projectDto: CreateProjectDto,
  ) {
    return await this.projectService.create({
      ...projectDto,
      client: { id } as Client,
    });
  }
}
