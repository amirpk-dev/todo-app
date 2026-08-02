const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const list = document.getElementById("todo-list");

const todos = [];

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    todos.push({
        task: text,
        isCompleted: false
    });

    render();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

function createTaskNode(todo) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.task;

    li.appendChild(textSpan);

    return li;
}

function render() {
    list.innerHTML = "";

    todos.forEach((todo) => {
        list.append(createTaskNode(todo));
    });
}