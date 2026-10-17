import "./styles.css";
import { TodoList } from "./models/todoList.js";

const myTodoList = new TodoList();
myTodoList.addTask({
  title: "My first task",
  projectId: myTodoList.activeProject.id,
  priority: "Low",
  description: "This is my very first task",
  notes: "1st task ever",
  checklist: ["Check this task", "Edit this task", "Delete this task"],
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
  checklist: ["Check this task", "Edit this task", "Delete this task"],
});

myTodoList.addTask({
  title: "Good title",
  completed: true,
  projectId: myTodoList.activeProject.id,
  priority: "Low",
  description: "This is my second task",
  notes: "Already on the 2nd task",
  checklist: ["Check this task", "Edit this task", "Delete this task"],
});

myTodoList.updateTask(myTodoList.tasks[2].id, { completed: false });

myTodoList.deleteTask(myTodoList.tasks[2].id);

myTodoList.updateProject(myTodoList.projects[1].id, {
  title: "Brand new project title",
});

console.log(myTodoList);
