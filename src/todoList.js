import { Project } from "./project.js";

export class TodoList {
  constructor(name) {
    this.name = name;
    console.log(`[TodoList] Initialized TodoList: ${this.name}`);
    this.projects = [];
    const defaultProject = new Project("Personal", "My personal tasks");
    this.projects.push(defaultProject);
    this.activeProject = this.projects[0];
  }

  addProject(name, description) {
    const project = new Project(name, description);
    this.projects.push(project);
    console.log(
      `[addProject] Project ${project.name} to the TodoList: ${this.name}`,
    );
  }
  switchProject(project_name) {
    const existsProject = this.projects.find(
      (project) => project.name === project_name,
    );

    if (!existsProject) {
      console.log(
        `[switchProject] Did not find Project: ${project_name} in TodoList: ${this.name}.`,
      );
      return;
    } else {
      this.activeProject = existsProject;
      console.log(
        `[switchProject] Switched to Project: ${this.activeProject.name} from todoList: ${this.name} `,
      );
    }
  }

  getActiveProject() {
    console.log(
      `[getActiveProject] Active project for ${this.name}: ${this.activeProject.name}`,
    );
    return this.activeProject;
  }

  deleteProject(project_name) {
    const existsProject = this.projects.find(
      (project) => project.name === project_name,
    );
    if (!existsProject) {
      console.log(
        `[deleteProject] Did not find Project: ${project_name} in TodoList: ${this.name}.`,
      );
      return;
    }

    this.projects = this.projects.filter(
      (project) => project.name !== project_name,
    );
    console.log(
      `[deleteProject] Project: ${project_name} has been removed from TodoList: ${this.name}`,
    );
    this.activeProject = this.projects[0];
    console.log(`[deleteProject] active Project: ${this.activeProject.name}`);
  }
  renameProject(project_name, new_name) {
    const existsProject = this.projects.find(
      (project) => project.name === project_name,
    );
    if (!existsProject) {
      console.log(
        `[renameProject] Did not find Project: ${project_name} in TodoList: ${this.name}.`,
      );
      return;
    }

    existsProject.name = new_name;
    console.log(
      `[renameProject] Project ${project_name} has been renamed to ${existsProject.name}`,
    );
  }

  addTask(taskData = {}) {
    this.activeProject.addTask(taskData);
  }

  updateTask(task_id, updates = {}) {
    const task = this.activeProject.getTaskById(task_id);
    if (!task) {
      console.log(
        `[updateTask] Task with ID: ${task_id} does not exist in ${this.activeProject}`,
      );
      return;
    }
    task.updateTask(updates);
    console.log(
      `[updateTask] Task with ID ${task.id} from ${this.activeProject.name} has been updated.`,
    );
  }

  deleteTask(task_id) {
    this.getActiveProject().deleteTask(task_id);
    console.log(
      `[deleteTask] Removed task with ID: ${task_id} from Project ${this.activeProject.name}`,
    );
  }
}
