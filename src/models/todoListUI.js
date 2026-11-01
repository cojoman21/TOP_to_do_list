import { ProjectUI } from "./projectUI.js";
import { TaskUI } from "./taskUI.js";

export class TodoListUI {
  constructor(todoList) {
    this.todoList = todoList;

    this.todoListContainer = document.createElement("div");
    this.todoListContainer.classList.add("todo-list-container");

    this.editTaskDialog = document.getElementById("edit-task-dialog");
    this.editTaskForm = document.getElementById("editTaskForm");
    this.editErrorPara = this.editTaskForm.querySelector(".edit-task-error");

    this.todoListContainer.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (!deleteBtn) return;

      const taskEl = deleteBtn.closest(".task-container");

      if (confirm("Are you sure that you want to delete this Todo?")) {
        this.todoList.deleteTask(taskEl.dataset.id);
        this.render();
      }
    });

    this.todoListContainer.addEventListener("click", (e) => {
      const editBtn = e.target.closest(".edit-btn");
      if (!editBtn) return;

      const taskEl = editBtn.closest(".task-container");
      const task = this.todoList.getTask(taskEl.dataset.id);
      this.editTaskForm.dataset.id = task.id;

      this.editErrorPara.textContent = "";

      const taskTitle = this.editTaskForm.querySelector("#edit-task-title");
      taskTitle.value = task.title;

      const taskDueDate = this.editTaskForm.querySelector(
        "#edit-task-due-date",
      );
      taskDueDate.value = task.dueDate.toLocaleDateString("en-CA");

      const taskPriority = this.editTaskForm.querySelector(
        "#edit-task-priority",
      );
      taskPriority.value = task.priority;

      const taskDescription = this.editTaskForm.querySelector(
        "#edit-task-description",
      );
      taskDescription.value = task.description;

      const taskNotes = this.editTaskForm.querySelector("#edit-task-notes");
      taskNotes.value = task.notes;

      this.editTaskDialog.showModal();
    });

    this.editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(this.editTaskForm);

      const updatedData = {
        title: data.get("edit-task-title"),
        dueDate: data.get("edit-task-due-date"),
        priority: data.get("edit-task-priority"),
        description: data.get("edit-task-description"),
        notes: data.get("edit-task-notes"),
      };

      try {
        this.todoList.updateTask(this.editTaskForm.dataset.id, updatedData);
        this.editTaskDialog.close();
        this.render();
      } catch (error) {
        this.editErrorPara.textContent = error.message;
      }
    });

    document
      .getElementById("cancel-update-btn")
      .addEventListener("click", (e) => {
        this.editTaskForm.reset();
        this.editTaskDialog.close();
      });

    this.editTaskDialog.addEventListener("close", (e) => {
      this.editTaskDialog.close();
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
