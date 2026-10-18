export class ProjectUI {
  constructor(project) {
    this.project = project;

    this.projectContainer = document.createElement("div");
    this.projectContainer.dataset.id = this.project.id;
    this.projectContainer.classList.add("project-container");

    this.projectTitle = document.createElement("p");
    this.projectTitle.classList.add("project-title");
    this.projectTitle.textContent = this.project.title;
    this.projectContainer.appendChild(this.projectTitle);

    this.projectDescription = document.createElement("p");
    this.projectDescription.classList.add("project-description");
    this.projectDescription.textContent = this.project.description;
    this.projectContainer.appendChild(this.projectDescription);

    this.projectContent = document.createElement("div");
    this.projectContent.classList.add("project-content");

    this.projectContainer.appendChild(this.projectContent);
  }

  getProjectHTML() {
    return this.projectContainer;
  }
}
