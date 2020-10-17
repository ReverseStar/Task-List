const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

function loadEventListeners(e) {
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);
    //DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);
}

loadEventListeners();

function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a Task first");
        return;
    }

    const li = document.createElement("li");
    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));
    li.style.backgroundColor = "yellow";

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";
    //link.id = '';

    link.innerHTML = '<i class = "fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
}
//Get task from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.style.backgroundColor = "#50ac50";
        li.style.color = "white";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class = "fa fa-remove" style="color:#d43a3a"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//Store Task in LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.remove()
        };
    }
    //console.log(e.target);
    //alert('Kicchu delete diram na');

    //Remove From Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

//Remove From Local Storage
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}


//Clear Task
function clearTasks() {
    //taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear From Local Storage
    clearFromLocalStorage();
}

//Clear From Local Storage
function clearFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}