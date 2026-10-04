import { addDays } from "date-fns";

export class Task {
  constructor({
    title,
    priority,
    status = "In Progress",
    dueDate = addDays(new Date(), 10),
    description = "",
    notes = "",
  } = {}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.priority = priority;
    this.status = status;
    this.dueDate = dueDate;
    this.description = description;
    this.notes = notes;
    console.log(`Initialized task: ${this.title}`);
  }

  getTask() {
    return this;
  }
  updateTask({
    title = this.title,
    priority = this.priority,
    status = this.status,
    dueDate = this.dueDate,
    description = this.description,
    notes = this.notes,
  } = {}) {
    this.title = title;
    this.priority = priority;
    this.status = status;
    this.dueDate = dueDate;
    this.description = description;
    this.notes = notes;
  }
  completeTask = () => {
    this.status = "Done";
  };
  reopenTask = () => {
    this.status = "In Progress";
  };
}
