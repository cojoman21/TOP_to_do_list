import {
  expandSVG,
  collapseSVG,
  deleteSVG,
  checkOffSVG,
  checkOnSVG,
  editSVG,
  calendarSVG,
  prioritySVG,
  descriptionSVG,
  notesSVG,
  statusSVG,
} from "../icons/icons.js";

import { format } from "date-fns";

export class TaskUI {
  constructor(task) {
    this.task = task;

    this.taskContainer = document.createElement("div");
    this.taskContainer.dataset.id = task.id;
    this.taskContainer.classList.add("task-container");

    this.taskContent = document.createElement("div");
    this.taskContent.classList.add("task-content");

    this.checkToggleBtn = document.createElement("button");
    this.checkToggleBtn.classList.add("check-toggle-btn");
    this.checkToggleBtn.innerHTML = this.task.completed
      ? checkOnSVG
      : checkOffSVG;
    this.taskContainer.appendChild(this.checkToggleBtn);
    // add event listener

    this.titlePara = document.createElement("p");
    this.titlePara.classList.add("task-title");
    this.titlePara.textContent = this.task.title;
    this.taskContainer.appendChild(this.titlePara);

    this.expandToggleBtn = document.createElement("button");
    this.expandToggleBtn.classList.add("expand-toggle-btn");
    this.expandToggleBtn.innerHTML = expandSVG;
    this.taskContainer.appendChild(this.expandToggleBtn);
    // add event listener

    this.dateField = document.createElement("div");
    this.dateField.classList.add("task-field");
    this.dateIcoSpan = document.createElement("span");
    this.dateIcoSpan.innerHTML = calendarSVG;
    this.datePara = document.createElement("p");
    this.datePara.classList.add("task-due-date");
    this.datePara.textContent = format(
      new Date(this.task.dueDate),
      "MMMM d, yyyy",
    );
    this.dateField.appendChild(this.dateIcoSpan);
    this.dateField.appendChild(this.datePara);
    // add event listener
    this.taskContent.appendChild(this.dateField);

    this.priorityField = document.createElement("div");
    this.priorityField.classList.add("toggle", "task-field");
    this.priorityIcoSpan = document.createElement("span");
    this.priorityIcoSpan.innerHTML = prioritySVG;
    this.priorityPara = document.createElement("p");
    this.priorityPara.classList.add("task-priority");
    this.priorityPara.textContent = this.task.priority;
    this.priorityField.appendChild(this.priorityIcoSpan);
    this.priorityField.appendChild(this.priorityPara);
    this.priorityField.style.display = "none";
    // add event listener to priorityPara
    this.taskContent.appendChild(this.priorityField);

    this.descriptionField = document.createElement("div");
    this.descriptionField.classList.add("toggle", "task-field");
    this.descriptionIcoSpan = document.createElement("span");
    this.descriptionIcoSpan.innerHTML = descriptionSVG;
    this.descriptionPara = document.createElement("p");
    this.descriptionPara.classList.add("task-description");
    if (this.task.description !== "") {
      this.descriptionPara.textContent = this.task.description;
    } else {
      this.descriptionPara.textContent = "Click to add description";
      this.descriptionPara.classList.add("placeholder");
    }
    this.descriptionField.appendChild(this.descriptionIcoSpan);
    this.descriptionField.appendChild(this.descriptionPara);
    this.descriptionField.style.display = "none";

    this.notesField = document.createElement("div");
    this.notesField.classList.add("toggle", "task-field");
    this.notesIcoSpan = document.createElement("span");
    this.notesIcoSpan.innerHTML = notesSVG;
    this.notesPara = document.createElement("p");
    this.notesPara.classList.add("task-notes");
    if (this.task.notes !== "") {
      this.notesPara.textContent = this.task.notes;
    } else {
      this.notesPara.textContent = "Click to add notes";
      this.notesPara.classList.add("placeholder");
    }
    this.notesField.appendChild(this.notesIcoSpan);
    this.notesField.appendChild(this.notesPara);
    this.notesField.style.display = "none";

    // Checklist section
    this.checklistField = document.createElement("div");
    this.checklistField.classList.add("toggle", "task-field");
    this.checklistIcoSpan = document.createElement("span");
    this.checklistIcoSpan.innerHTML = checklistSVG;
    this.checklistField.appendChild(this.checklistIcoSpan);
    this.checklistTitle = document.createElement("p");
    this.checklistField.appendChild(this.checklistTitle);
    this.checklistTitle.textContent = "Checklist";
    this.checklistEntries = document.createElement("div");
    this.checklistEntries.classList.add("checklist-entries");

    for (const { title, done } of this.task.checklist) {
      const checklistEntry = document.createElement("div");
      checklistEntry.classList.add("checklist-entry");
      const checkMarkBtn = document.createElement("button");
      checkMarkBtn.innerHTML = done ? checkOnSVG : checkOffSVG;
      checkMarkBtn.classList.add("checklist-entry-btn");
      checklistEntry.appendChild(checkMarkBtn);
      const titlePara = document.createElement("p");
      titlePara.classList.add("checklist-entry-title");
      titlePara.textContent = title;
      checklistEntry.appendChild(titlePara);
      this.checklistEntries.appendChild(checklistEntry);
    }

    this.checklistEntry = document.createElement("div");
    this.checklistEntry.classList.add("checklist-entry");
    this.checkItemMarkBtn = document.createElement("button");
    this.checkItemMarkBtn.innerHTML = done ? checkOnSVG : checkOffSVG;
    this.checkItemMarkBtn.classList.add("checklist-entry-btn");
    this.checklistEntry.appendChild(checkItemMarkBtn);
    this.checklistInput = document.createElement("input");
    this.checklistInput.classList.add("checklist-entry-input");
    this.checklistInput.placeholder = "Click to add item";
    this.checklistEntry.appendChild(checklistInput);
    this.checklistEntries.appendChild(checklistEntry);

    // Checklist input event listener
    this.checklistInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.checklistInput.value !== "") {
        const titlePara = document.createElement("p");
        titlePara.classList.add("checlist-entry-title");
        titlePara.textContent = this.checklistInput.value;
      }
    });

    this.checklistField.appendChild(this.checklistEntries);
    this.checklistField.style.display = "none";
  }
}
