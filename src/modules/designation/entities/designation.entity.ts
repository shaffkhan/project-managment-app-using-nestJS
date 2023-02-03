
import { BaseEntity } from "../..//base.entity";
import { Profile } from "../..//profile/entities/profile.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("client")
export class Designation extends BaseEntity {
    @Column({nullable:false})
    name : string;
    @Column()
    responsibilities : string;

    @OneToMany(()=>Profile,(profile)=>profile.Designation)
    profile:Profile[]//getting an array of profiles from profile
    
}
