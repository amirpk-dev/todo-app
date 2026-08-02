const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];
render();

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    todos.push({
        task: text,
        isCompleted: false
    });

    saveTodos();
    render();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

function createTaskNode(todo, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", () => {
        todo.isCompleted = checkbox.checked;

        textSpan.style.textDecoration = todo.isCompleted ? "line-through" : "";
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.task;
    if (todo.isCompleted) textSpan.style.textDecoration = "line-through";
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Enter the new todo", todo.task);
        
        if (newText === null || !newText.trim()) return;

        todos[index].task = newText.trim();

        saveTodos();
        render();
    });

    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";

    dltBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(dltBtn);

    return li;
}

function render() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        list.append(createTaskNode(todo, index));
    });
}