import { TodoList } from "./todoList.js";
import "./styles.css";
import { TodoListUI } from "./todoListUI.js";

console.log("Hello from webpack");

const todoList01 = new TodoList("My TodoList");
todoList01.addProject("New Project", "New description");
todoList01.addProject("New Project2", "New description");
todoList01.addProject("New Project3", "New description");

todoList01.getActiveProject();
todoList01.addTask({ title: "My first task", priority: "Low" });

todoList01.switchProject("New Project");
todoList01.addTask({ title: "My second task", priority: "Low" });

todoList01.switchProject("Bogus Name");
todoList01.switchProject("Personal");
todoList01.addTask({
  title: "My third task",
  priority: "Low",
  dueDate: new Date(2027, 2, 1),
});

todoList01.switchProject("Personal");
todoList01.addTask({
  title: "My fourth task",
  priority: "Low",
  notes: "Should be done by Mark",
});

todoList01.renameProject("Bogus name", "New Project Name");
todoList01.renameProject("New Project", "New Project Name");
todoList01.deleteProject("New Project");
todoList01.deleteProject("New Project Name");

todoList01.switchProject("New Project3");
todoList01.addTask({
  title: "Another task",
  priority: "Low",
  description: "Important task",
});

const ui = new TodoListUI(todoList01);
ui.render("#app");

const jsonData = JSON.stringify(todoList01);
localStorage.setItem("todoAppData", jsonData);
