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
  checklistSVG,
  circleEmptySVG,
  circleFullSVG,
} from "../icons/icons.js";

import { format } from "date-fns";

export class TaskUI {
  constructor(task) {
    this.task = task;

    this.taskContainer = document.createElement("div");
    this.taskContainer.dataset.id = this.task.id;
    this.taskContainer.classList.add("task-container");

    this.taskContent = document.createElement("div");
    this.taskContent.classList.add("task-content");

    this.checkToggleBtn = document.createElement("button");
    this.checkToggleBtn.classList.add("check-toggle-btn");
    this.checkToggleBtn.innerHTML = this.task.completed
      ? checkOnSVG
      : checkOffSVG;
    this.checkToggleBtn.addEventListener("click", (e) => {
      this.task.completed = !this.task.completed;
      this.checkToggleBtn.innerHTML = this.task.completed
        ? checkOnSVG
        : checkOffSVG;
    });
    this.taskContainer.appendChild(this.checkToggleBtn);

    this.titlePara = document.createElement("p");
    this.titlePara.classList.add("task-title");
    this.titlePara.textContent = this.task.title;
    this.taskContainer.appendChild(this.titlePara);

    this.expandToggleBtn = document.createElement("button");
    this.expandToggleBtn.classList.add("expand-toggle-btn");
    this.expandToggleBtn.innerHTML = expandSVG;
    this.expandToggleBtn.addEventListener("click", this._toggleExpand);
    this.taskContainer.appendChild(this.expandToggleBtn);

    this.editBtn = document.createElement("button");
    this.editBtn.classList.add("edit-btn");
    this.editBtn.innerHTML = editSVG;
    this.taskContainer.appendChild(this.editBtn);

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.classList.add("delete-btn");
    this.deleteBtn.innerHTML = deleteSVG;
    this.taskContainer.appendChild(this.deleteBtn);

    this.dateField = document.createElement("div");
    this.dateField.classList.add("task-date", "task-field");
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
    // add edit date event listener
    this.taskContent.appendChild(this.dateField);

    this.priorityField = document.createElement("div");
    this.priorityField.classList.add("toggle", "task-priority", "task-field");
    this.priorityIcoSpan = document.createElement("span");
    this.priorityIcoSpan.innerHTML = prioritySVG;
    this.priorityPara = document.createElement("p");
    this.priorityPara.classList.add("task-priority");
    this.priorityPara.textContent = this.task.priority;
    this.priorityField.appendChild(this.priorityIcoSpan);
    this.priorityField.appendChild(this.priorityPara);
    this.priorityField.style.display = "none";
    this.taskContent.appendChild(this.priorityField);

    this.descriptionField = document.createElement("div");
    this.descriptionField.classList.add(
      "toggle",
      "task-description",
      "task-field",
    );
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
    this.taskContent.appendChild(this.descriptionField);

    this.notesField = document.createElement("div");
    this.notesField.classList.add("toggle", "task-notes", "task-field");
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
    this.taskContent.appendChild(this.notesField);

    // Checklist section
    this.checklistField = document.createElement("div");
    this.checklistField.classList.add(
      "toggle",
      "task-checklist-container",
      "task-field",
    );
    this.checklistTitleDiv = document.createElement("div");
    this.checklistTitleDiv.classList.add("checklist-title-container");
    this.checklistIcoSpan = document.createElement("span");
    this.checklistIcoSpan.innerHTML = checklistSVG;
    this.checklistTitleDiv.appendChild(this.checklistIcoSpan);
    this.checklistFieldTitle = document.createElement("p");
    this.checklistTitleDiv.appendChild(this.checklistFieldTitle);
    this.checklistFieldTitle.textContent = "Checklist:";
    this.checklistField.appendChild(this.checklistTitleDiv);
    this.checklistEntries = document.createElement("div");
    this.checklistEntries.classList.add("checklist-entries");

    for (const item of this.task.checklist) {
      this.checklistEntries.appendChild(this._createChecklistItem(item));
    }

    this.checklistInputRow = document.createElement("div");
    this.checklistInputRow.classList.add("checklist-input-entry");
    this.checklistInput = document.createElement("input");
    this.checklistInput.classList.add("checklist-entry-input");
    this.checklistInput.placeholder = "Add item";
    this.checklistInputRow.appendChild(this.checklistInput);
    this.checklistEntries.appendChild(this.checklistInputRow);

    // Checklist input event listener
    this.checklistInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;

      const text = this.checklistInput.value.trim();
      if (!text) return;

      const item = this.task.addChecklistItem(text);
      this.checklistEntries.insertBefore(
        this._createChecklistItem(item),
        this.checklistInputRow,
      );

      this.checklistInput.value = "";
      this.checklistInput.focus();
    });

    this.checklistField.appendChild(this.checklistEntries);
    this.checklistField.style.display = "none";
    this.taskContent.appendChild(this.checklistField);

    this.taskContainer.appendChild(this.taskContent);
  }

  _createChecklistItem(item) {
    const checklistEntry = document.createElement("div");
    checklistEntry.classList.add("checklist-entry");

    const titlePara = document.createElement("p");
    titlePara.classList.add("checklist-entry-title");
    titlePara.textContent = item.title;
    checklistEntry.appendChild(titlePara);

    const checkMarkBtn = document.createElement("button");
    checkMarkBtn.innerHTML = circleEmptySVG;
    checkMarkBtn.classList.add("checklist-entry-btn");
    checkMarkBtn.addEventListener("click", () => {
      item.done = !item.done;
      checkMarkBtn.innerHTML = item.done ? circleFullSVG : circleEmptySVG;
    });
    checklistEntry.appendChild(checkMarkBtn);

    const deleteItemBtn = document.createElement("button");
    deleteItemBtn.classList.add("delete-item-btn");
    deleteItemBtn.innerHTML = deleteSVG;
    deleteItemBtn.addEventListener("click", () => {
      this.task.removeChecklistItem(item.id);
      checklistEntry.remove();
    });
    checklistEntry.appendChild(deleteItemBtn);

    return checklistEntry;
  }

  _toggleExpand = () => {
    const toggles = this.taskContent.querySelectorAll(".toggle");
    toggles.forEach((toggle) => {
      if (toggle.style.display === "none") {
        toggle.style.display = "flex";
        this.expandToggleBtn.innerHTML = collapseSVG;
      } else {
        toggle.style.display = "none";
        this.expandToggleBtn.innerHTML = expandSVG;
      }
    });
  };

  _editTaskForm = () => {};

  getTaskHTML() {
    return this.taskContainer;
  }
}
