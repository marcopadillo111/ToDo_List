let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
            function handleNewTaskSubmit(event) {
                event.preventDefault();
        
                const newTaskInput = document.getElementById('new-task-input');
                const taskName = newTaskInput.value.trim();
        
                if (taskName !== '') {
                    addTask({ name: taskName, checked: false });
                    newTaskInput.value = '';
        

                    saveTasksToLocalStorage();
                }
            }
        
            function addTask(task) {
                tasks.push(task);
                renderTasks();
            }
        
            function renderTasks() {
                const todoList = document.getElementById('todo-list');
                const taskListTitle = document.getElementById('task-list-title');
        
                todoList.innerHTML = '';
        
                tasks.forEach(function (task, index) {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'todo-item';

                    taskItem.innerHTML = `
                        <div class="check-container">
                        <label>
                            <input type="checkbox" style="display: none;" onchange="toggleTask(${index})">
                            <img src="check-mark.png" class="check-icon" style="display: ${task.checked ? 'inline-block' : 'none'};" onclick="toggleTask(${index})">
                        </label>
                        </div>
                        
                        <div class="todo-content" onclick="toggleTask(${index})">
                            <input type="text" value="${task.name}" readonly>
                        </div>

                        <div class="actions">
                            <button class="edit" style="display: ${task.checked ? 'none' : 'block'}" onclick="startEdit(${index})"><img src="pencil.png"></button>
                            <button class="delete" onclick="deleteTask(${index})"><img src="close.png"></button>
                        </div>
                    `;


                
        
                    if (task.checked) {
                        taskItem.querySelector('.todo-content').classList.add('completed');
                    }
        
                    todoList.appendChild(taskItem);
                });
        
                if (tasks.length === 0) {
                    taskListTitle.innerText = 'No Added Task';
                    taskListTitle.style.fontSize = '2rem';  
                    taskListTitle.style.textAlign = 'center';  
                } else {
                    taskListTitle.innerText = 'TASKS';
                    taskListTitle.style.fontSize = '1.5rem'; 
                    taskListTitle.style.textAlign = 'left';  
                }
            }
        
            function toggleTask(index) {
                tasks[index].checked = !tasks[index].checked;
                saveTasksToLocalStorage();
                renderTasks();
            }
        
            function startEdit(index) {
                const inputField = document.querySelector(`#todo-list .todo-item:nth-child(${index + 1}) .todo-content input`);
                inputField.removeAttribute('readonly');
                inputField.focus();
            
                inputField.setSelectionRange(inputField.value.length, inputField.value.length);
            
                inputField.addEventListener('blur', function () {
                    endEdit(index);
                });
            }
        
            function endEdit(index) {
                const inputField = document.querySelector(`#todo-list .todo-item:nth-child(${index + 1}) .todo-content input`);
                tasks[index].name = inputField.value.trim();
                inputField.setAttribute('readonly', 'true');
                saveTasksToLocalStorage();
                renderTasks();
            }
        
            function deleteTask(index) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTasks();
            }
        
            function saveTasksToLocalStorage() {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        
            document.getElementById('new-task-form').addEventListener('submit', handleNewTaskSubmit);
            renderTasks();