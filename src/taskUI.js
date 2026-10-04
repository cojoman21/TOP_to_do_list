export class TaskUI {
  constructor(task) {
    this.taskContainer = document.createElement("div");
    this.taskContainer.dataset.id = task.id;
    this.taskContainer.classList.add("taskContainer");

    this.taskTitle = document.createElement("h3");
    this.taskTitle.classList.add("taskTitle");
    this.taskTitle.textContent = task.title;

    this.taskPriority = document.createElement("p");
    this.taskPriority.classList.add("taskPriority");
    this.taskPriority.textContent = task.priority;

    this.taskStatus = document.createElement("p");
    this.taskStatus.classList.add("taskStatus");
    this.taskStatus.textContent = task.status;

    this.taskDueDate = document.createElement("p");
    this.taskDueDate.classList.add("taskDueDate");
    this.taskDueDate.textContent = task.dueDate;

    this.taskDescription = document.createElement("p");
    this.taskDescription.classList.add("taskDescription");
    this.taskDescription.textContent = task.description;

    this.taskNotes = document.createElement("p");
    this.taskNotes.classList.add("taskNotes");
    this.taskNotes.textContent = task.notes;

    this.taskContainer.appendChild(this.taskTitle);
    this.taskContainer.appendChild(this.taskPriority);
    this.taskContainer.appendChild(this.taskStatus);
    this.taskContainer.appendChild(this.taskDueDate);
    this.taskContainer.appendChild(this.taskDescription);
    this.taskContainer.appendChild(this.taskNotes);
  }

  getTaskHTML() {
    return this.taskContainer;
  }
}
