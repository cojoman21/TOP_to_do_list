import { ProjectUI } from "./projectUI.js";
import { TaskUI } from "./taskUI.js";

export class TodoListUI {
  constructor(todoList) {
    this.todoList = todoList;

    this.todoListContainer = document.createElement("div");
    this.todoListContainer.classList.add("todo-list-container");

    this.todoListContainer.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (!deleteBtn) return;

      const taskEl = deleteBtn.closest(".task-container");
      this.todoList.deleteTask(taskEl.dataset.id);
      if (confirm("Are you sure that you want to delete this Todo?")) {
        taskEl.remove();
      } else {
        return;
      }
    });

    this.todoListContainer.addEventListener("click", (e) => {
      e.preventDefault();
      const editBtn = e.target.closest(".edit-btn");
      if (!editBtn) return;

      const editDialog = document.getElementById("edit-task-dialog");
      editDialog.showModal();

      const taskEl = editBtn.closest(".task-container");
      this.todoList.deleteTask(taskEl.dataset.id);
    });

    this.render();
  }

  render() {
    this.todoListContainer.replaceChildren();

    for (const project of this.todoList.projects) {
      const projectUI = new ProjectUI(project);

      const tasks = this.todoList.tasks.filter(
        (task) => task.projectId === project.id,
      );
      for (const task of tasks) {
        const taskUI = new TaskUI(task);
        projectUI.projectContent.appendChild(taskUI.getTaskHTML());
      }

      this.todoListContainer.appendChild(projectUI.getProjectHTML());
    }
  }

  appendToPage(targetContainerClass) {
    const targetContainer = document.querySelector(targetContainerClass);
    targetContainer.appendChild(this.todoListContainer);
  }
}
