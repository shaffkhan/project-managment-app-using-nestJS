

import { BaseEntity } from "../../base.entity";
import { Profile } from "../../profile/entities/profile.entity";
import {Column,Entity,OneToOne,JoinColumn} from "typeorm"
import{Role} from "../enums/role.enum";
import { Client } from "../..//client/entities/client.entity";

@Entity("user")
export class User extends BaseEntity{
    @Column()
    name : string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({type:'enum', enum: Role, default: Role.staff})
    role:string;
    
 
    @OneToOne(()=> Profile, (profile)=> profile.user)
    @JoinColumn()
    profile:Profile


    @OneToOne(()=> Client, (client)=>client.User )
    @JoinColumn()
    client:Client;

}


