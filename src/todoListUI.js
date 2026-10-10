import { ProjectUI } from "./projectUI.js";

export class TodoListUI {
  constructor(todoList) {
    this.todoListContainer = document.createElement("div");
    this.todoListContainer.classList.add("todo-list-container");

    this.name = document.createElement("h1");
    this.name.classList.add("todo-list-name");
    this.name.textContent = todoList.name;

    this.todoListContent = document.createElement("div");
    this.todoListContent.classList.add("todo-list-content");

    for (const project of todoList.projects) {
      const projectUI = new ProjectUI(project);
      this.todoListContent.appendChild(projectUI.getProjectHTML());
    }

    this.todoListContainer.appendChild(this.name);
    this.todoListContainer.appendChild(this.todoListContent);
  }

  render(targetContainer) {
    const container = document.querySelector(targetContainer);
    container.appendChild(this.todoListContainer);
  }
}
