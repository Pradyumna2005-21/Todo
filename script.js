document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    const totalCount = document.getElementById('totalCount');
    const pendingCount = document.getElementById('pendingCount');
    const completedCount = document.getElementById('completedCount');

    // Pre-populated default tasks
    const defaultTasks = [
        { text: "Configure Docker container environment", completed: true },
        { text: "Review GitHub Actions deployment pipeline", completed: false },
        { text: "Update Nginx server configuration files", completed: false },
        { text: "Prepare project documentation & report", completed: false },
        { text: "Verify Linux process monitoring scripts", completed: true }
    ];

    // Load tasks from local storage or set initial expanded task list
    let tasks = JSON.parse(localStorage.getItem('app_tasks'));
    if (!tasks || tasks.length === 0) {
        tasks = defaultTasks;
        localStorage.setItem('app_tasks', JSON.stringify(tasks));
    }

    const saveTasks = () => {
        localStorage.setItem('app_tasks', JSON.stringify(tasks));
    };

    const updateStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        totalCount.textContent = total;
        pendingCount.textContent = pending;
        completedCount.textContent = completed;
    };

    const renderTasks = () => {
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            taskList.innerHTML = `<div class="empty-state">No tasks available. Add a new one above!</div>`;
            updateStats();
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');

            li.innerHTML = `
                <div class="task-left">
                    <div class="custom-checkbox" onclick="toggleTask(${index})">
                        ${task.completed ? '<i class="fa-solid fa-check" style="font-size: 11px;"></i>' : ''}
                    </div>
                    <span class="task-text">${escapeHtml(task.text)}</span>
                </div>
                <button class="delete-btn" onclick="deleteTask(${index})" title="Delete Task">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;

            taskList.appendChild(li);
        });

        updateStats();
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.unshift({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all tasks?')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    renderTasks();
});