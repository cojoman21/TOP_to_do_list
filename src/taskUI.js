import { format } from "date-fns";
import {
  expandIcon,
  deleteIcon,
  checkOn,
  checkOff,
  editIcon,
  calendarIcon,
  notesIcon,
  priorityIcon,
  descriptionIcon,
  statusIcon,
} from "./icons.js";

export class TaskUI {
  constructor(task) {
    this.task = task;
    this.priorities = ["Low", "Medium", "High"];

    this.taskContainer = document.createElement("div");
    this.taskContainer.dataset.id = task.id;
    this.taskContainer.classList.add("task-container");

    this.buttonsContainer = document.createElement("div");
    this.buttonsContainer.classList.add("buttons-container");

    this.taskContent = document.createElement("div");
    this.taskContent.classList.add("task-content");

    this.checkBtn = document.createElement("button");
    this.checkBtn.id = "check-btn";
    this.checkBtn.innerHTML = task.getTaskStatus() ? checkOn : checkOff;
    this.taskContainer.appendChild(this.checkBtn);

    this.taskTitle = document.createElement("h3");
    this.taskTitle.classList.add("task-title", "input-field");
    this.taskTitle.textContent = task.title;
    this.taskContainer.appendChild(this.taskTitle);

    this.priorityField = document.createElement("div");
    this.priorityField.classList.add("task-priority", "toggle", "input-field");
    this.priorityFieldIcon = document.createElement("span");
    this.priorityFieldIcon.innerHTML = priorityIcon;
    this.taskPriority = document.createElement("p");
    this.taskPriority.textContent = task.priority;
    this.priorityField.style.display = "none";
    this.priorityField.appendChild(this.priorityFieldIcon);
    this.priorityField.appendChild(this.taskPriority);
    this.taskContent.appendChild(this.priorityField);
    this.taskPriority.addEventListener("click", () => {
      this.makeEditable;
    });

    this.statusField = document.createElement("div");
    this.statusField.classList.add("task-status", "toggle", "input-field");
    this.statusFieldIcon = document.createElement("span");
    this.statusFieldIcon.innerHTML = statusIcon;
    this.taskStatus = document.createElement("p");
    this.taskStatus.textContent = task.status;
    this.statusField.style.display = "none";
    this.statusField.appendChild(this.statusFieldIcon);
    this.statusField.appendChild(this.taskStatus);
    this.taskContent.appendChild(this.statusField);

    this.dueDateField = document.createElement("div");
    this.dueDateField.classList.add("task-due-date", "input-field");
    this.dueDateFieldIcon = document.createElement("span");
    this.dueDateFieldIcon.innerHTML = calendarIcon;
    this.taskDueDate = document.createElement("p");
    this.taskDueDate.textContent =
      "Due: " + format(new Date(task.dueDate), "MMMM d, yyyy");
    this.dueDateField.appendChild(this.dueDateFieldIcon);
    this.dueDateField.appendChild(this.taskDueDate);
    this.taskContent.appendChild(this.dueDateField);

    this.descriptionField = document.createElement("div");
    this.descriptionField.classList.add(
      "task-description",
      "toggle",
      "input-field",
    );
    this.descriptionFieldIcon = document.createElement("span");
    this.descriptionFieldIcon.innerHTML = descriptionIcon;
    this.taskDescription = document.createElement("p");
    if (task.description !== "") {
      this.taskDescription.textContent = task.description;
    } else {
      this.taskDescription.textContent = "Click to add description";
      this.taskDescription.style.color = "grey";
    }
    this.descriptionField.style.display = "none";
    this.descriptionField.appendChild(this.descriptionFieldIcon);
    this.descriptionField.appendChild(this.taskDescription);
    this.taskContent.appendChild(this.descriptionField);

    this.notesField = document.createElement("div");
    this.notesField.classList.add("task-notes", "toggle", "input-field");
    this.notesFieldIcon = document.createElement("span");
    this.notesFieldIcon.innerHTML = notesIcon;
    this.taskNotes = document.createElement("p");
    if (task.notes !== "") {
      this.taskNotes.textContent = task.notes;
    } else {
      this.taskNotes.textContent = "Click to add notes";
      this.taskNotes.style.color = "grey";
    }
    this.notesField.style.display = "none";
    this.notesField.appendChild(this.notesFieldIcon);
    this.notesField.appendChild(this.taskNotes);
    this.taskContent.appendChild(this.notesField);

    this.expandBtn = document.createElement("button");
    this.expandBtn.id = "expand-btn";
    this.expandBtn.innerHTML = expandIcon;
    this.expandBtn.addEventListener("click", this.toggleExpandTask);
    this.buttonsContainer.appendChild(this.expandBtn);

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.id = "delete-btn";
    this.deleteBtn.innerHTML = deleteIcon;
    this.buttonsContainer.appendChild(this.deleteBtn);

    this.taskContainer.appendChild(this.taskContent);
    this.taskContainer.appendChild(this.buttonsContainer);

    const inputs = this.taskContent.querySelectorAll(".input-field");
    inputs.forEach((input) => {});
  }

  getTaskHTML() {
    return this.taskContainer;
  }

  toggleExpandTask = () => {
    const toggles = this.taskContent.querySelectorAll(".toggle");
    toggles.forEach((toggle) => {
      if (toggle.style.display === "none") {
        toggle.style.display = "flex";
      } else {
        toggle.style.display = "none";
      }
    });
  };

  makeEditable = (displayElement, inputElement) => {};

  priorityInput = () => {
    const select = document.createElement("select");

    this.priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority;
      option.textContent = priority;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      console.log(this.task.priority);
      this.task.setPriority(select.value);
      console.log(this.task.priority);

      const newStatus = document.createElement("p");
      newStatus.textContent = this.task.priority;
      select.replaceWith(newStatus);
    });

    this.replaceWith(select);
  };
}
