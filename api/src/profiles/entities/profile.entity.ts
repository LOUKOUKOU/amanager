import { Organisation } from 'src/organisations/entities/organisation.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PROFILE_TYPE {
  SUPERVISOR,
  DEVELOPER,
  ADMIN,
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  profileId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @OneToMany(() => Organisation, (organisation) => organisation.owner)
  @JoinColumn()
  organisations: Organisation[];

  @Column({
    type: 'enum',
    enum: PROFILE_TYPE,
    default: PROFILE_TYPE.DEVELOPER,
  })
  type: PROFILE_TYPE;

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];

  @OneToMany(() => Project, (project) => project.manager)
  projects: Project[];

  @ManyToMany(() => Project, (project) => project.developers)
  assignedProjects: Project[];
}
