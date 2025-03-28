let tasks = [];
let trash = [];

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    let task = { text: taskText, id: Date.now() };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span contenteditable="true">${task.text}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    
    let trashList = document.getElementById("trashList");
    trashList.innerHTML = "";
    trash.forEach(task => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="btn btn-success btn-sm" onclick="restoreTask(${task.id})">Restore</button>
        `;
        trashList.appendChild(li);
    });
}

function deleteTask(id) {
    let index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        trash.push(tasks[index]);
        tasks.splice(index, 1);
        renderTasks();
    }
}

function restoreTask(id) {
    let index = trash.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.push(trash[index]);
        trash.splice(index, 1);
        renderTasks();
    }
}
