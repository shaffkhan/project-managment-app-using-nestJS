import { Project } from "../../project/entities/project.entity";
import { Entity,Column ,ManyToOne} from "typeorm";
import { BaseEntity } from "../../base.entity";
@Entity("projectDocument")
export class Project_doc extends BaseEntity{
    @Column()
    name :string;
    @Column()
    version :number;
    @Column()
    author:string;
    @Column()
    type : string;


    @ManyToOne(()=>Project,(project)=>project.Project_doc)
    project:Project;
}
