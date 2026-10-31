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

      if (confirm("Are you sure that you want to delete this Todo?")) {
        taskEl.remove();
        this.todoList.deleteTask(taskEl.dataset.id);
      } else {
        return;
      }
    });

    this.todoListContainer.addEventListener("click", (e) => {
      e.preventDefault();
      const editBtn = e.target.closest(".edit-btn");
      if (!editBtn) return;

      const taskEl = editBtn.closest(".task-container");
      const task = this.todoList.getTask(taskEl.dataset.id);

      const editDialog = document.getElementById("edit-task-dialog");

      const taskTitle = editDialog.querySelector("#task-title");
      taskTitle.value = task.title;
      const taskDueDate = editDialog.querySelector("#task-due-date");
      const targetDate = new Date(task.dueDate);
      taskDueDate.value = targetDate.toLocaleDateString("en-CA");
      const taskPriority = editDialog.querySelector("#task-priority");
      taskPriority.value = task.priority;
      const taskDescription = editDialog.querySelector("#task-description");
      taskDescription.value = task.description;
      const taskNotes = editDialog.querySelector("#task-notes");
      taskNotes.value = task.notes;

      editDialog.showModal();
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
