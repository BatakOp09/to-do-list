document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector("#todo-input");
    const button = document.getElementById("add-task-btn");
    const list = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach((t) => renderTask(t));

    button.addEventListener("click", function (e) {
      const inputText = input.value.trim();

      if (inputText === "") {
        return;
      }

      const todoTask = {
        id: Date.now(),
        input: inputText,
        completed: false,
      };

      tasks.push(todoTask);
        saveTask();
        renderTask(todoTask);
      input.value = ""; // clear input
      console.log(task);
    });

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('task-id', task.id)
        if(task.completed)  li.classList.add("completed")
        li.innerHTML = `
        <span>${task.input}</span>
        <button> delete </button>`
        
        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed
            li.classList.toggle("completed");
            saveTask()
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();// prevents toggle from firing
            tasks = tasks.filter((t) => t.id === task.id);
            li.remove()
            saveTask();
        })

        list.append(li)

    }

    function saveTask() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})