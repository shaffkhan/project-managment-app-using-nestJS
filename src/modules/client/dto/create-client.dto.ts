
import {IsOptional, IsEmail , IsNotEmpty} from 'class-validator';
import { Designation } from 'src/modules/designation/entities/designation.entity';
import { User } from 'src/modules/user/entities/user.entity';
export class CreateClientDto {
    @IsNotEmpty()
    contactPerson: string;
  
    @IsNotEmpty()
    contactNumber: string;
    @IsNotEmpty()
    contactEmail: string;
  
    @IsNotEmpty()
    address: string;
    @IsOptional()
    user:User;
    @IsOptional()
    designation:Designation;

}
