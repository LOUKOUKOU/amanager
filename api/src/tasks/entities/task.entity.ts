import { Profile } from 'src/profiles/entities/profile.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TASK_STATUS {
  BACKLOG,
  UP_NEXT,
  IN_PROGRESS,
  TESTING,
  DONE,
  CANCELLED,
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.assignee)
  assignee: Profile;

  @ManyToOne(() => Task, (task) => task.project)
  project: Project;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  deadline: Date;

  @Column({
    type: 'enum',
    enum: TASK_STATUS,
    default: TASK_STATUS.BACKLOG,
  })
  status: TASK_STATUS;
}
