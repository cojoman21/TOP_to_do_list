import { Task } from "./task.js";

export class Project {
  constructor(name, description = "") {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.tasks = [];
    console.log(`Initialized project: ${this.name}`);
  }

  addTask(taskData = {}) {
    const task = new Task(taskData);
    this.tasks.push(task);
  }
  deleteTask(id) {
    const existsTask = this.tasks.find((task) => task.id === id);
    if (!existsTask) return;

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  getTaskById(id) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }
  getTasksByTitle(keyword) {
    const tasks = this.tasks.filter((task) => task.title.includes(keyword));
    return tasks;
  }
  getTasksByPriority(priority) {
    const tasks = this.tasks.filter((task) => task.priority === priority);
    return tasks;
  }
  getTasksByDaysRemaining(days) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);
    const tasks = this.tasks.filter((task) => task.dueDate <= deadline);
    return tasks;
  }
  getTasksByStatus(status) {
    const tasks = this.tasks.filter((task) => task.status === status);
    return tasks;
  }
}
