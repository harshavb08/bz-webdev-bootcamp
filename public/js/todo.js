console.log("Hello from js");
document.getElementById("loader").style.display = "block";

const inputBox = document.getElementById('inputBox');
inputBox.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        if (inputBox.value == "") alert("Please enter a todo");
        createTodo(inputBox.value);
        inputBox.value = "";
    }
});

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', function() {
    if (inputBox.value == "") alert("Please enter a todo");
    createTodo(inputBox.value);
    inputBox.value = "";
});

async function getAllTodo() {
    const response = await fetch("/api/todos");
    const todos = await response.json();
    // console.log(todos.data);
    document.getElementById("loader").style.display = "none";
    if (todos.status == "success") {
        const todoList = document.getElementById("todoList");

        todoList.innerHTML = null
        console.log(todos);
        todoCount = todos.data.length;
        document.getElementById("todoCount").innerHTML = todoCount

        todos.data.forEach((el, index) => {

            let listItem = document.createElement("li");
            let labelItem = document.createElement("label");
            let inputItem = document.createElement("input");
            let buttonItem = document.createElement("button");

            // * CREATING THE DELETE BUTTON
            buttonItem.classList.add("btn");
            buttonItem.classList.add("btn-outline-danger");
            buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`
            buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`)

            // * CREATING THE CHECKBOX
            inputItem.classList.add("form-check-input")
            inputItem.classList.add("me-1")
            inputItem.type = "checkbox";
            inputItem.value = "";
            inputItem.setAttribute("onclick", `setChecked("${el._id}")`)
            inputItem.id = `Checkbox${index}`


            // * CREATING THE TEXT LABEL
            let textNode = document.createTextNode(el.title);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for", `Checkbox${index}`)
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            if (el.isCompleted) {
                labelItem.classList.add("crossed")
                inputItem.setAttribute("checked", "true")
            }

            // * ADDING BOOTSTRAP CLASSES TO THE LIST ITEM <LI> TAG
            listItem.classList.add("list-group-item")
            listItem.classList.add("my-list-item")

            listItem.appendChild(inputItem);
            listItem.appendChild(labelItem);
            listItem.appendChild(buttonItem);

            todoList.appendChild(listItem);
        })
        if (document.body.classList.contains('dark')) {
            var todosLi = document.getElementsByClassName("list-group-item my-list-item");
            for (var i = 0; i < todosLi.length; i++) {
                todosLi[i].classList.add('dark');
            }

        }

    }
}

getAllTodo();

async function createTodo(text) {
    const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: text }),
    });
    const data = await response.json();
    //console.log(data);
    if (data.status == "success") {
        getAllTodo();
    }
}

async function deleteTodo(id) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    //console.log(data);
    if (data.status == "success") {
        getAllTodo();
        getAllCompletedTodos();
        getAllDeletedTodos();
    }
}

async function setChecked(id) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: true }),
    });
    const data = await response.json();
    //console.log(data);
    if (data.status == "success") {
        getAllTodo();
        getAllCompletedTodos();
    }
}


getAllCompletedTodos();

async function getAllCompletedTodos() {
    const response = await fetch("/api/todos/completed");
    const todos = await response.json();
    console.log(todos.data);
    document.getElementById("loader").style.display = "none";
    if (todos.status == "success") {
        const todoList = document.getElementById("completedTodosList");
        todoList.innerHTML = null
        console.log(todos);
        todoCount = todos.data.length;
        document.getElementById("completedCount").innerHTML = todoCount
        todos.data.forEach((el, index) => {

            let listItem = document.createElement("li");
            let labelItem = document.createElement("label");
            let inputItem = document.createElement("input");
            let buttonItem = document.createElement("button");

            // * CREATING THE DELETE BUTTON
            buttonItem.classList.add("btn");
            buttonItem.classList.add("btn-outline-danger");
            buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`
            buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`)

            // * CREATING THE CHECKBOX
            inputItem.classList.add("form-check-input")
            inputItem.classList.add("me-1")
            inputItem.type = "checkbox";
            inputItem.value = "";
            inputItem.id = `Checkbox${index}`
            inputItem.setAttribute("checked", "true")
            inputItem.setAttribute("onclick", `setUncheck("${el._id}")`)



            // * CREATING THE TEXT LABEL
            let textNode = document.createTextNode(el.title);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for", `Checkbox${index}`)
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            if (el.isCompleted) {
                labelItem.classList.add("crossed")
                inputItem.setAttribute("checked", "true")
            }

            // * ADDING BOOTSTRAP CLASSES TO THE LIST ITEM <LI> TAG
            listItem.classList.add("list-group-item")
            listItem.classList.add("my-list-item")

            listItem.appendChild(inputItem);
            listItem.appendChild(labelItem);
            listItem.appendChild(buttonItem);

            todoList.appendChild(listItem);
        })
        if (document.body.classList.contains('dark')) {
            var todosLi = document.getElementsByClassName("list-group-item my-list-item");
            for (var i = 0; i < todosLi.length; i++) {
                todosLi[i].classList.add('dark');
            }

        }
    }
}


async function setUncheck(id) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: false }),
    });
    const data = await response.json();
    //console.log(data);
    if (data.status == "success") {
        getAllTodo();
        getAllCompletedTodos();
        getAllDeletedTodos();
    }
}

getAllDeletedTodos();

async function getAllDeletedTodos() {
    const response = await fetch("/api/todos/deleted");
    const todos = await response.json();
    console.log(todos.data);
    document.getElementById("loader").style.display = "none";
    if (todos.status == "success") {
        const todoList = document.getElementById("deletedTodosList");
        todoList.innerHTML = null
        console.log(todos);
        todoCount = todos.data.length;
        document.getElementById("deletedCount").innerHTML = todoCount
        todos.data.forEach((el, index) => {

            let listItem = document.createElement("li");
            let labelItem = document.createElement("label");
            let inputItem = document.createElement("input");
            let buttonItem = document.createElement("button");

            // * CREATING THE DELETE BUTTON
            buttonItem.classList.add("btn");
            buttonItem.classList.add("btn-outline-danger");
            buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`
            buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`)


            // CREATING THE CHECKBOX
            inputItem.classList.add("form-check-input")
            inputItem.classList.add("me-1")
            inputItem.type = "checkbox";
            inputItem.value = "";
            inputItem.id = `Checkbox${index}`
            inputItem.setAttribute("checked", "true")
            inputItem.setAttribute("onclick", `setUncheck("${el._id}")`)



            // * CREATING THE TEXT LABEL
            let textNode = document.createTextNode(el.title);
            labelItem.classList.add("form-check-label");
            labelItem.setAttribute("for", `Checkbox${index}`)
            labelItem.appendChild(textNode);
            labelItem.setAttribute("data-name", `${el._id}`);

            if (el.isCompleted) {
                labelItem.classList.add("crossed")
                inputItem.setAttribute("checked", "true")
            }

            // * ADDING BOOTSTRAP CLASSES TO THE LIST ITEM <LI> TAG
            listItem.classList.add("list-group-item")
            listItem.classList.add("my-list-item")

            listItem.appendChild(inputItem);
            listItem.appendChild(labelItem);
            listItem.appendChild(buttonItem);

            todoList.appendChild(listItem);
        })
        if (document.body.classList.contains('dark')) {
            var todosLi = document.getElementsByClassName("list-group-item my-list-item");
            for (var i = 0; i < todosLi.length; i++) {
                todosLi[i].classList.add('dark');
            }

        }
    }
}




fetch("/api/todos")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //console.log(data);
        document.getElementById("loader").style.display = "none";
    });



const themeButton = document.getElementById('themeButton');

themeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    var todosLi = document.getElementsByClassName("list-group-item my-list-item");
    for (var i = 0; i < todosLi.length; i++) {
        todosLi[i].classList.toggle('dark');
    }
    var state = document.getElementById("dt-icon").className;
    //console.log(state);
    if (state == "fas fa-moon fa-lg fa-fw") {
        document.getElementById("dt-icon").className = "fas fa-sun fa-lg fa-fw";
    } else {
        document.getElementById("dt-icon").className = "fas fa-moon fa-lg fa-fw";
    }
});