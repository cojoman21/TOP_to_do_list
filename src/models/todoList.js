import { Task } from "./task.js";
import { Project } from "./project.js";

export class TodoList {
  constructor() {
    this.id = crypto.randomUUID();
    // both tasks and projects for easier handling and scaling
    this.projects = [];
    this.tasks = [];
    const defaultProject = new Project({
      title: "Personal",
      description: "This is the default project",
    });
    this.projects.push(defaultProject);
    this.activeProject = defaultProject;
  }

  addTask(taskData) {
    // we always use the id of the active project
    // each project UI will have a "Add task" button
    const task = new Task(taskData);
    this.tasks.push(task);
  }

  deleteTask(task_id) {
    // find() returns false or the found object
    const task = this.tasks.find((task) => task.id === task_id);
    if (!task) {
      throw new Error(`Task with id "${task_id}" not found.`);
    } else {
      this.tasks = this.tasks.filter((task) => task.id !== task_id);
    }
  }

  updateTask(task_id, updatedData) {
    const task = this.tasks.find((task) => task.id === task_id);
    if (!task) {
      throw new Error(`Task with id "${task_id}" not found.`);
    } else {
      // loop through updates and triggers Task's setters and validation
      for (const [key, value] of Object.entries(updatedData)) {
        if (key in task) {
          task[key] = value;
        }
      }
    }
  }

  addProject(projectData) {
    const project = new Project(projectData);
    this.projects.push(project);
  }
  deleteProject(project_id) {
    const project = this.projects.find((project) => project.id === project_id);
    if (!project) {
      throw new Error(`Project with the id "${project_id}" not found.`);
    } else {
      this.projects = this.projects.filter(
        (project) => project.id !== project_id,
      );
    }
  }
  updateProject(project_id, updatedData) {
    const project = this.projects.find((project) => project.id === project_id);
    if (!project) {
      throw new Error(`Project with the id "${project_id}" not found.`);
    } else {
      for (const [key, value] of Object.entries(updatedData)) {
        if (key in project) {
          project[key] = value;
        }
      }
    }
  }

  setActiveProject(project_id) {
    const project = this.projects.find((project) => project.id === project_id);
    if (!project) {
      throw new Error(`Project with the id "${project_id}" not found.`);
    } else {
      this.activeProject = project;
    }
  }
}
