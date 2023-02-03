import { Profile } from "../../profile/entities/profile.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity("team")
export class Team extends BaseEntity{
    
    @Column()
    name:string;

    @OneToMany(()=>Profile,(profile)=>profile.team)
    profile:Profile[]
}
