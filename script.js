


let input = document.querySelector(".input");
let submit = document.querySelector(".add");

let tasksDiv = document.querySelector('.tasks');
//create array to add the tasks in it by the function (addTaskToArray)
let arrayOfTasks = [];
// check if the localstorage has items and the delete it to the arrayOfTasks
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'))

}
// get data from local storage
getDataFromLocalStorage()

//submit Task
submit.onclick = () => {
    if (input.value !== "") {
        addTaskToArray(input.value);// add the Task to the Array of Tasks
        input.value = ""// empty the input field 
    }
}

//click on Task element

tasksDiv.addEventListener("click", (e) => {
    //delete button
    if (e.target.classList.contains('del')) {
        // console.log(e.target.parentElement.getAttribute("data-id"))
        //remove task from Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //remove Element from page
        e.target.parentElement.remove();

    }

    //task Element

    if (e.target.classList.contains("task")) {
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(taskText) {

    let task = {
        id: Date.now(),
        title: taskText,
        complated: false
    }
    arrayOfTasks.push(task);
    //add task to the Array of Text
    addElementsToPageFrom(arrayOfTasks);
    //add task to the Local Storage
    addDataToLocalStrageFrom(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty tasksDiv
    tasksDiv.innerHTML = "";
    //Looping on Array of Tasks
    arrayOfTasks.forEach((task) => {
        //create neu div to caontainer the new Task info
        let mainDiv = document.createElement("div");
        mainDiv.className = "task";

        if (task.complated) {
            mainDiv.className = "task done"
        }
        mainDiv.setAttribute("data-id", task.id);
        mainDiv.appendChild(document.createTextNode(task.title));

        // Create Delete Button 
        let deleteSpan = document.createElement("span");
        deleteSpan.className = "del";
        deleteSpan.appendChild(document.createTextNode("Delete"));

        //append the delete button to the main div
        mainDiv.appendChild(deleteSpan);

        //add main div to the tasks container

        tasksDiv.appendChild(mainDiv)


    })

}

function addDataToLocalStrageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}


function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data)
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStrageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].complated == false ? (arrayOfTasks[i].complated = true) : (arrayOfTasks[i].complated = false)
        }
        addDataToLocalStrageFrom(arrayOfTasks);

    }
}



