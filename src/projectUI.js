import { TaskUI } from "./taskUI.js";

export class ProjectUI {
  constructor(project) {
    this.projectContainer = document.createElement("div");
    this.projectContainer.dataset.id = project.id;
    this.projectContainer.classList.add("projectContainer");

    this.projectName = document.createElement("h2");
    this.projectName.classList.add("projectName");
    this.projectName.textContent = project.name;

    this.projectDescription = document.createElement("p");
    this.projectDescription.classList.add("projectDescription");
    this.projectDescription.textContent = project.description;

    this.projectContainer.appendChild(this.projectName);
    this.projectContainer.appendChild(this.projectDescription);

    for (const task of project.tasks) {
      const taskUI = new TaskUI(task);
      this.projectContainer.appendChild(taskUI.getTaskHTML());
    }
  }

  getProjectHTML() {
    return this.projectContainer;
  }
}
