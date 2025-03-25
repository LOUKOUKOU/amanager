import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { PROFILE_TYPE, SessionService } from './SessionService';
import {
  TableCell,
  TableConfig,
} from '@/components/table/notus-table.component';

export interface CreateProjectDto {
  supervisor: string;
  developers?: string[];
  title: string;
  description: string;
  dueDate: Date;
}

export interface Project {
  projectId: string;
  supervisor: string;
  developers: string[];
  tasks: string[];
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public _initialised: boolean = false;
  public sessionService: SessionService;
  private APIUrl: string = environment.APIUrl;
  private projectListSubject: BehaviorSubject<Project[] | null>;
  public projectList$: Observable<Project[] | null>;
  private projectCurrentSubject: BehaviorSubject<Project | null>;
  public projectCurrent$: Observable<Project | null>;

  constructor(private http: HttpClient) {
    this.sessionService = inject(SessionService);
    this.projectListSubject = new BehaviorSubject<Project[] | null>(null);
    this.projectList$ = this.projectListSubject.asObservable();
    this.projectCurrentSubject = new BehaviorSubject<Project | null>(null);
    this.projectCurrent$ = this.projectCurrentSubject.asObservable();
  }

  public projectTableConfig: TableConfig = {
    headerConfig: [
      { key: 'name', title: 'Project Name' },
      { key: 'tasks', title: 'Number of tasks' },
      { key: 'developers', title: 'Number of developers' },
      { key: 'dueDate', title: 'Due date' },
      { key: 'progress', title: 'Project progress', type: 'progress-bar' },
    ],
  };

  // {
  //   name: { content: 'Big Project 1' },
  //   tasks: { content: '4569' },
  //   developers: { content: '340' },
  //   dueDate: {
  //     content: '5 April 2025',
  //     // iconPrefix: 'fas fa-arrow-up text-emerald-500',
  //   },
  //   progress: { content: '15' },
  // },
  // {
  //   name: { content: 'Big Project 1' },
  //   tasks: { content: '4569' },
  //   developers: { content: '340' },
  //   dueDate: { content: '5 April 2025' },
  //   progress: { content: '30' },
  // },
  // {
  //   name: { content: 'Big Project 1' },
  //   tasks: { content: '4569' },
  //   developers: { content: '340' },
  //   dueDate: { content: '5 April 2025' },
  //   progress: { content: '60' },
  // },
  // {
  //   name: { content: 'Big Project 1' },
  //   tasks: { content: '4569' },
  //   developers: { content: '340' },
  //   dueDate: { content: '5 April 2025' },
  //   progress: { content: '80' },
  // },
  // {
  //   name: { content: 'Big Project 1' },
  //   tasks: { content: '4569' },
  //   developers: { content: '340' },
  //   dueDate: { content: '5 April 2025' },
  //   progress: { content: '60' },
  // },

  get projects(): Array<Record<string, TableCell>> {
    return (this.projectListSubject.value || []).map((project: Project) =>
      this.mapProjectData(project)
    );
  }

  initialiseData() {
    if (!this._initialised) {
      this.fetchProjects(this.sessionService.profileId).subscribe({
        next: (projects) => {
          this.projectListSubject.next(projects);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
      this._initialised = true;
    }
  }

  fetchMyProjects() {
    this.fetchProjects(
      this.sessionService.profileId,
      this.sessionService.profileType
    ).subscribe({
      next: (projects) => {
        this.projectListSubject.next(projects);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  fetchProjects(
    profileId: string,
    type: PROFILE_TYPE = PROFILE_TYPE.DEVELOPER
  ) {
    return this.http
      .get<Project[]>(
        `${this.APIUrl}/projects/profile/${profileId}?type=${type}`
      )
      .pipe(
        map((projects: Project[]) => {
          return projects;
        })
      );
  }

  fetchProject(projectId: string) {
    return this.http.get<Project>(`${this.APIUrl}/projects/${projectId}`).pipe(
      first((project: Project) => {
        this.projectCurrentSubject.next(project);
        return true;
      })
    );
  }

  createProject(project: CreateProjectDto) {
    project.supervisor = this.sessionService.profileId;

    return this.http
      .post<CreateProjectDto>(`${this.APIUrl}/projects`, project)
      .pipe(
        map((Project: CreateProjectDto) => {
          return Project;
        })
      );
  }

  updateProject() {}
  deleteProject() {}

  mapProjectData(project: Project): Record<string, TableCell> {
    return {
      name: { content: project.title },
      tasks: { content: (project.tasks || []).length.toString() },
      developers: { content: (project.developers || []).length.toString() },
      dueDate: { content: new Date(project.dueDate).toDateString() },
      progress: { content: '15' },
    };
  }
}
