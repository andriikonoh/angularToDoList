import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from '../entity/project';
import {ProjectService} from '../services/project.service';


@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent {
  constructor(private projectService: ProjectService) {
    this.getAllProjects();
  }
  @Input() selectedProjectId;
  @Output() delete = new EventEmitter();
  projects: Project[] = [];

  deleteProject(project) {
    this.projectService.deleteProject(project)
      .subscribe(() => {
        this.getAllProjects();
        this.delete.emit();
      });
  }

  addProject(projectName) {
    const newProject: Project = {name: projectName};
    this.projectService.createProject(newProject)
      .subscribe(() => {
        this.getAllProjects();
      });

  }

  getAllProjects() {
    this.projectService
      .getProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }

  updateProject(project) {
    this.projectService.changeProjectName(project)
      .subscribe(() => {
        this.getAllProjects();
      });
  }
}
