
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const taskName = document.getElementById("taskName");
const taskCategory = document.getElementById("taskCategory");
const taskTime = document.getElementById("taskTime");

const openForm = document.getElementById("openForm");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [
    {
        id: 1,
        name: "Morning Training",
        category: "Training",
        time: "08:00",
        completed: true
    },
    {
        id: 2,
        name: "Fitness and Jogging",
        category: "Fitness",
        time: "10:00",
        completed: false
    },
    {
        id: 3,
        name: "Team Practice",
        category: "Training",
        time: "14:00",
        completed: false
    },
    {
        id: 4,
        name: "Football Match",
        category: "Match",
        time: "16:00",
        completed: false
    }
];

let currentFilter = "All";


openForm.addEventListener("click", function() {
    taskForm.classList.toggle("show");
});


taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newTask = {
        id: Date.now(),
        name: taskName.value.trim(),
        category: taskCategory.value,
        time: taskTime.value,
        completed: false
    };

    if (!newTask.name || !newTask.time) {
        alert("Please fill in all fields!");
        return;
    }

    tasks.push(newTask);

    taskForm.reset();
    taskForm.classList.remove("show");

    displayTasks();

});

function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {
        return currentFilter === "All" ||
               task.category === currentFilter;
    });

    filteredTasks.forEach(function(task) {

        const div = document.createElement("div");

        div.classList.add("task");

        if (task.completed) {
            div.classList.add("completed");
        }

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            displayTasks();

        });

        const info = document.createElement("div");

        info.classList.add("task-info");

        const title = document.createElement("h3");

        title.textContent = task.name;

        const details = document.createElement("p");

        details.textContent =
            `${task.category} • ${task.time}`;

        info.appendChild(title);
        info.appendChild(details);

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Remove";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            displayTasks();

        });

        div.appendChild(checkbox);
        div.appendChild(info);
        div.appendChild(deleteBtn);

        taskList.appendChild(div);

    });

    
    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

}

// Filter tasks
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();

    });

});


displayTasks();
