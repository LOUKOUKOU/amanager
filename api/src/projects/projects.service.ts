import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';
import { OrganisationsService } from 'src/organisations/organisations.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly profilesService: ProfilesService,
    private readonly organisationService: OrganisationsService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project();
    if (!createProjectDto.supervisor) throw new Error('Supervisor not found');
    const supervisor = await this.profilesService.findOne(
      createProjectDto.supervisor,
    );
    if (!supervisor) throw new Error('Supervisor not found');
    project.supervisor = supervisor;
    project.title = createProjectDto.title;
    project.dueDate = createProjectDto.dueDate;
    project.startDate = new Date();
    project.description = createProjectDto.description;

    const organisation = await this.organisationService.findOneByProfile(
      supervisor.id,
    );
    if (!organisation) throw new Error('Organisation not found');

    project.organisation = organisation;

    return this.projectRepository.save(project);
  }

  findAll(page = 0, limit = 100) {
    return this.projectRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  findAllBySupervisor(id: string, page = 0, limit = 100) {
    return this.projectRepository.find({
      where: { supervisor: { profileId: id } },
      take: limit,
      skip: page * limit,
    });
  }

  findAllByDeveloper(id: string, page = 0, limit = 100) {
    return this.projectRepository.find({
      where: { developers: { profileId: id } },
      take: limit,
      skip: page * limit,
    });
  }

  findOne(id: string) {
    return this.projectRepository.findOne({
      where: { projectId: id },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project: Record<string, string | Date | Profile | Profile[]> = {};
    if (updateProjectDto.supervisor) {
      const supervisor = await this.profilesService.findOne(
        updateProjectDto.supervisor,
      );
      if (!supervisor) throw new Error('Supervisor not found');
      project.supervisor = supervisor;
    }
    if (updateProjectDto.title) project.title = updateProjectDto.title;
    if (updateProjectDto.dueDate) project.dueDate = updateProjectDto.dueDate;
    if (updateProjectDto.description)
      project.description = updateProjectDto.description;
    return this.projectRepository.update({ projectId: id }, project);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    if (!project) throw new Error(`Project with id ${id} not found`);
    return this.projectRepository.remove([project]);
  }
}
