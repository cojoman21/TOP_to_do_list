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
    this.activeProjectId = defaultProject.id;
  }

  save() {
    localStorage.setItem("todoList", JSON.stringify(this));
  }

  toJSON() {
    return {
      id: this.id,
      projects: this.projects,
      tasks: this.tasks,
      activeProjectId: this.activeProjectId,
    };
  }

  static fromJSON(data) {
    const todoList = new TodoList();
    todoList.id = data.id;
    todoList.projects = data.projects.map((p) => Project.fromJSON(p));
    todoList.tasks = data.tasks.map((t) => Task.fromJSON(t));
    todoList.activeProjectId = data.activeProjectId;
    return todoList;
  }

  get activeProject() {
    return this.projects.find((p) => p.id === this.activeProjectId);
  }

  setActiveProject(project_id) {
    const project = this.projects.find((project) => project.id === project_id);
    if (!project) {
      throw new Error(`Project with the id "${project_id}" not found.`);
    } else {
      this.activeProjectId = project.id;
    }
  }

  addTask(taskData) {
    // we always use the id of the active project
    // each project UI will have a "Add task" button
    const task = new Task(taskData);
    this.tasks.push(task);
    this.save();
  }

  getTask(taskID) {
    const task = this.tasks.find((task) => task.id === taskID);
    if (!task) {
      throw new Error(`Task with id "${taskID}" not found.`);
    } else {
      return task;
    }
  }

  deleteTask(taskID) {
    // find() returns false or the found object
    const task = this.tasks.find((task) => task.id === taskID);
    if (!task) {
      throw new Error(`Task with id "${taskID}" not found.`);
    } else {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);
      this.save();
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
      this.save();
    }
  }

  addProject(projectData) {
    const project = new Project(projectData);
    this.projects.push(project);
    this.save();
  }

  deleteProject(project_id) {
    const project = this.projects.find((project) => project.id === project_id);
    if (!project) {
      throw new Error(`Project with the id "${project_id}" not found.`);
    } else {
      this.projects = this.projects.filter(
        (project) => project.id !== project_id,
      );
      if (this.activeProjectId === project_id) {
        this.activeProjectId = this.projects[0]?.id ?? null;
      }
      this.save();
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
      this.save();
    }
  }
}
