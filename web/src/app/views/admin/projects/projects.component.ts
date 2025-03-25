import { ModalComponent } from '@/components/modal/modal.component';
import { NotusTableComponent } from '@/components/table/notus-table.component';
import { Component } from '@angular/core';
import { baseAdmin } from '../base-admin';
import { FormComponent, FormConfig } from '@/components/form/form.component';
import { CreateProjectDto, ProjectService } from '@/services/ProjectService';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NotusTableComponent, ModalComponent, FormComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent extends baseAdmin {
  protected formConfig: FormConfig = {
    name: 'project-form',
    fields: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Title',
        errorMessage: 'title is required',
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        required: true,
        placeholder: 'Description',
        errorMessage: 'Description is required',
      },
      // {
      //   key: 'supervisor',
      //   label: 'Supervisor',
      //   type: 'text',
      //   required: true,
      //   placeholder: 'Supervisor',
      //   errorMessage: 'Supervisor is required',
      // },
      // {
      //   key: 'developers',
      //   label: 'Developers',
      //   type: 'text',
      //   required: false,
      //   placeholder: 'Developers',
      //   errorMessage: 'Developers is required',
      // },
      {
        key: 'due_date',
        label: 'Due date',
        type: 'date',
        required: true,
        placeholder: 'Due date',
        errorMessage: 'Due date is required',
      },
    ],
    submitText: 'Create Project',
  };
  protected formValues: Record<string, string> = {
    name: '',
    description: '',
    status: '',
  };

  constructor(protected projectService: ProjectService) {
    super();
    projectService.initialiseData();
  }

  submitForm(data: Record<string, string>) {
    const createProject: CreateProjectDto = {
      title: data['title'] ?? '',
      description: data['description'] ?? '',
      supervisor: data['supervisor'] ?? '',
      dueDate: new Date(data['due_date'] || ''),
    };

    this.projectService.createProject(createProject).subscribe({
      next: () => {
        this.projectService.fetchMyProjects();
        this.setModal(false);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
}
