import { Project } from "../../project/entities/project.entity";
import { Entity ,Column,ManyToOne} from "typeorm";
import { BaseEntity } from "../../base.entity";
import { Profile } from "../../profile/entities/profile.entity";

@Entity()
export class Task  extends BaseEntity{
    @Column()
    title:string;
    @Column()
    description : string;
    @Column()
    asignee : string;
    @Column()
    reporter : string;
    @Column()
    priorty : number;
    @Column()
    estimatedDuration : number;
    @Column()
    status: boolean;
    
    @ManyToOne(()=>Project,(Project)=>Project.Task)
    Project:Project[];

    @ManyToOne(()=>Profile,(Profile)=>Profile.Task)
    Profile:Profile;
    
}
