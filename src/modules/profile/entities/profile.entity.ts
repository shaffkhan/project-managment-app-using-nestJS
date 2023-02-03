
import { User } from "../../user/entities/user.entity";
import {Column,Entity,ManyToMany,ManyToOne,OneToOne,OneToMany, JoinColumn} from "typeorm"
import { BaseEntity } from "../../base.entity";
import { Designation } from "../../designation/entities/designation.entity";
import { Team } from "../../team/entities/team.entity";
import { Task } from "../../task/entities/task.entity";


@Entity("profile")
export class Profile extends BaseEntity{
    @Column()
    avatar:string;
    @Column()
    address : string;
    @Column()
    jobType : string;
    @Column()
    isRemote : boolean;
    @Column()
    totalHours : number;
    @Column()
    salaryPerHour : number;

    @OneToOne(()=>User,(user)=>user.profile)
    @JoinColumn()
    user:User

    @ManyToOne(()=>Designation,(Designation)=>Designation.profile)
    Designation:Designation;


    @ManyToOne(()=>Team,(team)=>team.profile)
    team:Team;


    @OneToMany(()=>Task,(Task)=>Task.Profile)
    Task:Task;
}
