let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

// ADD TASK
function addTask() {
    let task = document.getElementById("taskInput").value;

    if (!task) {
        alert("Enter task");
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "data.json", true);
    xhr.send();
    
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
        document.getElementById("taskInput").value = "";
    

    
}


// DISPLAY TASKS
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((t, index) => {
        list.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
            ${t}
            <div>
                <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        </li>`;
    });
}


// DELETE TASK
function deleteTask(index) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "data.json", true);

   
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    

    xhr.send();
}


// UPDATE TASK
function editTask(index) {
    let newTask = prompt("Update task:", tasks[index]);

    if (newTask) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "data.json", true);
          xhr.send();
       
            tasks[index] = newTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        

      
    }
}