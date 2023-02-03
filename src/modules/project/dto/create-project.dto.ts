import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateTaskDto } from "../../task/dto/create-task.dto";
import { CreateProjectCategoryDto } from "../../project-category/dto/create-project-category.dto";
import { CreateProjectDocumentDto } from "../../project-document/dto/create-project-document.dto";
import { CreateTeamDto } from "../../team/dto/create-team.dto";
import { CreateClientDto } from "src/modules/client/dto/create-client.dto";
import { Client } from "src/modules/client/entities/client.entity";

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    duration: string;

    @IsString()
    budget: string;

   

    @IsString()
    proposal: string;

    @IsString()
    feasibility: string;

    @IsBoolean()
    isInHouse: boolean;

    @IsBoolean()
    status: boolean;

    @IsOptional()
    client : Client

}