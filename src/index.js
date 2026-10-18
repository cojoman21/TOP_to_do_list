import "./styles.css";
import { TodoList } from "./models/todoList.js";
import { TodoListUI } from "./models/todoListUI.js";

const myTodoList = new TodoList();
myTodoList.addTask({
  title: "My first task",
  projectId: myTodoList.activeProject.id,
  priority: "Low",
  description: "This is my very first task",
  notes: "1st task ever",
  checklist: [
    { title: "Check this task", done: false },
    { title: "Edit this task", done: false },
    { title: "Delete this task", done: false },
  ],
});

myTodoList.addProject({
  title: "My new Project",
  description: "This is the first project created by myself",
});

myTodoList.setActiveProject(myTodoList.projects[1].id);

myTodoList.addTask({
  title: "My second task",
  projectId: myTodoList.activeProject.id,
  priority: "Medium",
  description: "This is my second task",
  notes: "Already on the 2nd task",
  checklist: [
    { title: "Check this task", done: false },
    { title: "Edit this task", done: false },
    { title: "Delete this task", done: false },
  ],
});

myTodoList.addTask({
  title: "Good title",
  completed: true,
  projectId: myTodoList.activeProject.id,
  priority: "Low",
  description: "This is my second task",
  notes: "Already on the 2nd task",
  checklist: [
    { title: "Check this task", done: false },
    { title: "Edit this task", done: false },
    { title: "Delete this task", done: false },
  ],
});

myTodoList.updateTask(myTodoList.tasks[2].id, { completed: false });

myTodoList.updateProject(myTodoList.projects[1].id, {
  title: "Brand new project title",
});

const myTodoListUI = new TodoListUI(myTodoList);
myTodoListUI.appendToPage(".main-content");

console.log(myTodoList);
