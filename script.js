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

function createTaskNode(todo, index) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.task;

    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";

    dltBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
    });

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