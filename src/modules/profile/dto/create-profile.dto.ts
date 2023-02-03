import {IsOptional, IsEmail} from 'class-validator';
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { CreateDesignationDto } from "src/modules/designation/dto/create-designation.dto";

export class CreateProfileDto {

        @IsOptional()
        avatar:string;
       
        @IsOptional()
        address : string;
        @IsOptional()
        jobType : string;
        @IsOptional()
        isRemote : boolean;
        @IsOptional()
        totalHours : number;
        @IsOptional()
        salaryPerHour : number;
        @IsOptional()
        user:CreateUserDto;

        @IsOptional()
        designation:CreateDesignationDto;
    
    }

