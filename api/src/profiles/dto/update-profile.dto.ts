import { Organisation } from 'src/organisations/entities/organisation.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';

export class UpdateProfileDto {
  projects: Project[];
  tasks: Task[];
  displayName: string;
}
