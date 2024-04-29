document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");
    const errorMessage = document.getElementById("errorMessage");

    let todoCounter = 0;
    let todos = [];

    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
        todos = storedTodos;
        renderTodos();
    }

    addBtn.addEventListener("click", function () {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            todoInput.value = "";
            errorMessage.style.display = "none";
        } else {
            errorMessage.textContent = "Input cannot be empty";
            errorMessage.style.display = "block";
        }
    });

    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addBtn.click();
        }
    });

    function addTodoItem(todoText) {
        const todoId = "todo_" + todoCounter;
        const todo = { id: todoId, text: todoText };
        todos.push(todo);
        saveTodos();
        renderTodos();
        todoCounter++;
    }

    function deleteTodoItem(todoId) {
        todos = todos.filter((todo) => todo.id !== todoId);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }


    function renderTodos() {
        todoList.innerHTML = "";

        todos.forEach((todo) => {
            const li = document.createElement("li");
            li.setAttribute("id", todo.id);

            const todoSpan = document.createElement("span");
            todoSpan.textContent = todo.text;
            li.appendChild(todoSpan);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", function () {
                deleteTodoItem(todo.id);
            });

            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
});
