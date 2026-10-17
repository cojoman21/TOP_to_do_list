export class Project {
  constructor({ title, description = "" } = {}) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
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
}
