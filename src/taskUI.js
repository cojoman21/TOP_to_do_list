export class TaskUI {
  constructor(task) {
    this.taskContainer = document.createElement("div");
    this.taskContainer.dataset.id = task.id;
    this.taskContainer.classList.add("task-container");

    this.taskTitle = document.createElement("h3");
    this.taskTitle.classList.add("task-title");
    this.taskTitle.textContent = task.title;

    this.taskPriority = document.createElement("p");
    this.taskPriority.classList.add("task-priority");
    this.taskPriority.textContent = task.priority;

    this.taskStatus = document.createElement("p");
    this.taskStatus.classList.add("task-status");
    this.taskStatus.textContent = task.status;

    this.taskDueDate = document.createElement("p");
    this.taskDueDate.classList.add("task-due-date");
    this.taskDueDate.textContent = task.dueDate;

    this.taskDescription = document.createElement("p");
    this.taskDescription.classList.add("task-description");
    this.taskDescription.textContent = task.description;

    this.taskNotes = document.createElement("p");
    this.taskNotes.classList.add("task-notes");
    this.taskNotes.textContent = task.notes;

    this.taskContent = document.createElement("div");
    this.taskContent.classList.add("task-content");

    this.taskContainer.appendChild(this.taskTitle);
    this.taskContent.appendChild(this.taskPriority);
    this.taskContent.appendChild(this.taskStatus);
    this.taskContent.appendChild(this.taskDueDate);
    this.taskContent.appendChild(this.taskDescription);
    this.taskContent.appendChild(this.taskNotes);
    this.taskContainer.appendChild(this.taskContent);
  }

  getTaskHTML() {
    return this.taskContainer;
  }
}
