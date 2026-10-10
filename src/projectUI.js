import { TaskUI } from "./taskUI.js";

export class ProjectUI {
  constructor(project) {
    this.projectContainer = document.createElement("div");
    this.projectContainer.dataset.id = project.id;
    this.projectContainer.classList.add("project-container");

    this.name = document.createElement("h2");
    this.name.classList.add("project-name");
    this.name.textContent = project.name;

    this.projectDescription = document.createElement("p");
    this.projectDescription.classList.add("project-description");
    this.projectDescription.textContent = project.description;

    this.projectContent = document.createElement("div");
    this.projectContent.classList.add("project-content");

    for (const task of project.tasks) {
      const taskUI = new TaskUI(task);
      this.projectContent.appendChild(taskUI.getTaskHTML());
    }

    this.projectContainer.appendChild(this.name);
    this.projectContainer.appendChild(this.projectDescription);
    this.projectContainer.appendChild(this.projectContent);
  }

  getProjectHTML() {
    return this.projectContainer;
  }
}
