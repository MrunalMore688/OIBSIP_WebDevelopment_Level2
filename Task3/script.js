const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');


let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];


const saveTasks = () => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    render();
};


const addTask = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
};


const toggleTask = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            const isNowCompleted = !task.completed;
            return {
                ...task,
                completed: isNowCompleted,
                completedAt: isNowCompleted ? new Date().toLocaleString() : null
            };
        }
        return task;
    });
    saveTasks();
};


const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
};


const editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit your task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
    }
};


const render = () => {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <div class="task-details">
                <strong>${task.text}</strong>
                <small>Added: ${task.createdAt}</small>
                ${task.completedAt ? `<small>Finished: ${task.completedAt}</small>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn-complete" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
};


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});


render();
