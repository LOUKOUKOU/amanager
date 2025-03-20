import { Organisation } from 'src/organisations/entities/organisation.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.projects)
  supervisor: Profile;

  @ManyToMany(() => Profile, (profile) => profile.assignedProjects)
  developers: Profile[];

  @ManyToOne(() => Organisation, (organisation) => organisation.projects)
  organisation: Organisation;

  @OneToMany(() => Task, (task) => task.project)
  Tasks: Task[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  deadline: Date;
}
