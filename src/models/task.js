import { addDays, isValid, parseISO } from "date-fns";

const VALID_PRIORITIES = ["Low", "Medium", "High", "Urgent"];

export class Task {
  constructor({
    projectId,
    title,
    priority = "Medium",
    completed = false,
    dueDate = addDays(new Date(), 10),
    description = "",
    notes = "",
    checklist = [],
  } = {}) {
    this.id = crypto.randomUUID();
    this.projectId = projectId;
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

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    let date;
    if (typeof value === "string") {
      date = parseISO(value);
    } else if (value instanceof Date) {
      date = value;
    }
    if (!isValid(date)) {
      throw new Error(`Invalid due date: "${value}".`);
    }

    this._dueDate = date;
  }

  get checklist() {
    return this._checklist;
  }
  set checklist(value) {
    if (!Array.isArray(value)) {
      throw new Error("Checklist must be an array.");
    }
    this._checklist = value.map((item) => ({
      ...item,
      id: item.id ?? crypto.randomUUID(),
    }));
  }

  addChecklistItem(title) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("Checklist title must be a non-empty string.");
    }
    const item = { id: crypto.randomUUID(), title: title.trim(), done: false };
    this.checklist.push(item);
    return item;
  }
  removeChecklistItem(id) {
    const index = this._checklist.findIndex((item) => item.id === id);
    if (index !== -1) this._checklist.splice(index, 1);
  }
}
