import { ProjectUI } from "./projectUI.js";

export class TodoListUI {
  constructor(todoList) {
    this.todoListContainer = document.createElement("div");
    this.todoListContainer.classList.add("todoListContainer");

    this.name = document.createElement("h1");
    this.name.classList.add("todoListTitle");
    this.name.textContent = todoList.name;

    this.todoListContainer.appendChild(this.name);

    for (const project of todoList.projects) {
      const projectUI = new ProjectUI(project);
      this.todoListContainer.appendChild(projectUI.getProjectHTML());
    }
  }

  render(targetContainer) {
    const container = document.querySelector(targetContainer);
    container.appendChild(this.todoListContainer);
  }
}
