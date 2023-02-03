import { Client } from "../../client/entities/client.entity";
import { Column, Entity, ManyToOne ,OneToMany} from "typeorm";
import { BaseEntity } from "../../base.entity";
import { Project_doc } from "../../project-document/entities/project-document.entity";
import { ProjectCategory } from "../../project-category/entities/project-category.entity";
import { Task } from "../../task/entities/task.entity";
@Entity("project")
export class Project extends BaseEntity{
    @Column()
    title : string;
    @Column()
     duration : string;
     @Column()
     budget : string;
     @Column()
     category : string;
     @Column()
     proposal : string;
     @Column()
     feasibility : string;
     @Column()
     isInHouse : boolean;
     @Column()
     status : boolean;

     @ManyToOne(()=>Client,(Client)=>Client.project)
    Client:Client;

    @OneToMany(()=>Project_doc,(Project_doc)=>Project_doc.project)
    Project_doc:Project_doc;

    @ManyToOne(()=>ProjectCategory,(ProjectCategory)=>ProjectCategory.project)
    ProjectCategory:ProjectCategory;


    @OneToMany(()=>Task,(Task)=>Task.Project)
    Task:Task;

    
}
