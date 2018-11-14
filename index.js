/*
	Классическое to do приложение.
Старайтесь продумывать архитектуру этого маленького приложения. (чтобы легко расширялось и изменялось)
1. При клике на "Добавить задачу" - добавляется новая задача в соответствующий раздел (шаблон задачи есть в коде с тегом <task>)
2. При клике на sort задачи сортируются по первой букве алфавита, при втором клике по последней и т.д.
3. При клике на "Удалить" задача удаляется.
4. При наведении на "переместить" показывается выпадающий список с оставшиемся разделами, куда можно переместить задачу.
   Так например для in-process показываются разделы to do и done.
*/

function addTask(taskSectionName) {
    const titleOfTask = prompt("Введите название задачи:", "Новая задача");
    const bodyOfTask = prompt("Введите задачу:", "Выполнить задачу");

    if (!titleOfTask || !bodyOfTask) {
        alert("Задача не была создана, все поля должны быть заполнены.");
        return null;
    }

    const newTask = document.getElementById("templateOfTask").content.cloneNode(true);
    newTask.querySelector(".task-name").innerText = `${titleOfTask}`;
    newTask.querySelector(".task-description").innerText = `${bodyOfTask}`;
    if (taskSectionName === "in-process") {
        newTask.querySelector(".task-move-drop").firstElementChild.innerText = "To Do";
    }
    document.querySelector(`.${taskSectionName}`).querySelector(".board").appendChild(newTask);
    document.querySelector(`.${taskSectionName}`).isSort = false;
}

function deleteTask(event) {
    const task = event.target.parentNode.parentNode;
    task.remove();
}

function sort(taskSectionName) {

    function compare(a, b) {
        const contentA = a.querySelector(".task-name").innerText;
        const contentB = b.querySelector(".task-name").innerText;
        if (taskSection.isSort === false) {
            return (contentA === contentB ? 0 : (contentA > contentB ? 1 : -1))
        } else {
            return (contentA === contentB ? 0 : (contentA > contentB ? -1 : 1))
        }
    }

    const taskSection = document.querySelector(`.${taskSectionName}`);
    const tasks = taskSection.querySelector(".board").children;
    const sortedTasks = [...tasks].sort(compare);
    taskSection.isSort = !taskSection.isSort;
    taskSection.querySelector(".board").innerHtml = "";
    for (i = 0; i < sortedTasks.length; i++) {
        taskSection.querySelector(".board").appendChild(sortedTasks[i]);
    }
}

function relocate(event) {
    const task = event.target.parentNode.parentNode.parentNode.parentNode;
    const taskToRelocate = task.cloneNode(true);
    task.remove();
    const sectionToPut = event.target.innerText.replace(" ", "-").toLowerCase();
    const dropMenuToChange = taskToRelocate.querySelector(".task-move-drop");
    if (sectionToPut === "in-process") {
        dropMenuToChange.firstElementChild.innerText = "To Do";
    } else if (sectionToPut === "to-do") {
        dropMenuToChange.firstElementChild.innerText = "In Process";
    }
    document.querySelector(`.${sectionToPut}`).querySelector(".board").appendChild(taskToRelocate);
}
