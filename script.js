const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task.text);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    deleteTask(task.text);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(addTaskToDOM);
}

function deleteTask(text) {
  const tasks = getTasks().filter((t) => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(text) {
  const tasks = getTasks();
  const updated = tasks.map((t) =>
    t.text === text ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(updated));
}
