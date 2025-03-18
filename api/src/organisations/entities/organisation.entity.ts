import { Profile } from 'src/profiles/entities/profile.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  organisationId: string;

  @Column()
  name: string;

  @OneToMany(() => Profile, (profile) => profile.organisation)
  members: Profile[];

  @OneToMany(() => Project, (project) => project.organisation)
  projects: Project[];
}
