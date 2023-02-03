import { Profile } from '../..//profile/entities/profile.entity';
import { User } from '../..//user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Project } from '../../project/entities/project.entity';

@Entity('client')
export class Client extends BaseEntity {
  @Column()
  contactPerson: String;

  @Column()
  contactNumber: string;

  @Column()
  contactEmail: string;

  @Column()
  address: string;

  @OneToOne(() => User, (User) => User.client)
  User: User;

  @OneToMany(() => Project, (project) => project.Client)
  project: Project;
}
