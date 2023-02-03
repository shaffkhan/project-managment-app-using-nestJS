import { Project } from "../../project/entities/project.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity()
export class ProjectCategory extends BaseEntity{
    @Column()
    name : string;
    
    @OneToMany(()=>Project,(project)=>project.ProjectCategory)
    project:Project[];
}
