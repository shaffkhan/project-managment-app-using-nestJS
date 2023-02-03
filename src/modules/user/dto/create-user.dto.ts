
import {IsOptional,IsNotEmpty} from "class-validator"
import { CreateClientDto } from "src/modules/client/dto/create-client.dto";
import { CreateProfileDto } from "src/modules/profile/dto/create-profile.dto";
import { ProfileService } from "src/modules/profile/profile.service";
export class CreateUserDto {
    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    role:string;
    
    @IsOptional()
    profile:CreateProfileDto

    @IsOptional()
    client:CreateClientDto

}
