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
  @Column()
  profileId: string;

  @Column({
    type: 'enum',
    enum: PROFILE_TYPE,
    default: PROFILE_TYPE.DEVELOPER,
  })
  type: PROFILE_TYPE;

  @Column()
  displayName: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @OneToOne(() => Organisation, (organisation) => organisation.members)
  @JoinColumn()
  organisation: Organisation;

  @OneToMany(() => Task, (task) => task.assignee)
  @JoinColumn()
  tasks: Task[];

  @OneToMany(() => Project, (project) => project.supervisor)
  @JoinColumn()
  projects: Project[];

  @ManyToMany(() => Project, (project) => project.developers)
  @JoinColumn()
  assignedProjects: Project[];
}
