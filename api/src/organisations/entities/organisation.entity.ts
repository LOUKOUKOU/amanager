import { Profile } from 'src/profiles/entities/profile.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToMany(() => Profile, (profile) => profile.organisations)
  employees: Profile[];

  @ManyToOne(() => Profile, (owner) => owner.organisations)
  owner: Profile;

  @OneToMany(() => Project, (project) => project.organisation)
  projects: Project[];
}
