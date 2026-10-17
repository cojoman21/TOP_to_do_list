import { addDays } from "date-fns";

const VALID_PRIORITIES = ["Low", "Medium", "High", "Urgent"];

export class Task {
  constructor({
    title,
    priority = "Medium",
    completed = false,
    dueDate = addDays(new Date(), 10),
    description = "",
    notes = "",
    checklist = [],
  } = {}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.priority = priority;
    this.completed = completed;
    this.dueDate = dueDate;
    this.description = description;
    this.notes = notes;
    this.checklist = checklist;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    if (value.length < 3) {
      throw new Error(
        `Invalid title: "${value}". Should be at least 3 characters long.`,
      );
    } else if (/^\d/.test(value)) {
      throw new Error(
        `Invalid title: "${value}". Should not start with a digit.`,
      );
    }
    this._title = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    if (!VALID_PRIORITIES.includes(value)) {
      throw new Error(
        `Invalid priority: "${value}". Must be one of: ${VALID_PRIORITIES.join(", ")}`,
      );
    }
    this._priority = value;
  }

  get checklist() {
    return this._checklist;
  }
  set checklist(value) {
    if (!Array.isArray(value)) {
      throw new Error("Checklist must be an array.");
    }
    this._checklist = value;
  }

  addChecklistItem(item) {
    if (typeof item !== "string" || item.trim() === "") {
      throw new Error("Checklist item must be a non-empty string.");
    }
    this.checklist.push({ title: item, done: false });
  }
  removeChecklistItem(index) {
    this.checklist.splice(index, 1);
  }
}
