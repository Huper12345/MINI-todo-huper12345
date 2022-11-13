"use strict";

// Add TASK

const taskForm = document.querySelector('#taskForm');

const taskInputText = document.querySelector('#taskInputText');

const taskInputDate = document.querySelector('#taskInputDate ');

const taskInputRadioblue = document.querySelector('#taskInputRadioblue');

const taskInputRadioYellow = document.querySelector('#taskInputRadioYellow');

const taskInputRadioRed = document.querySelector('#taskInputRadioRed');

const taskPriorityLow = document.querySelector('#taskTimeLow');

const taskPriorityMiddle = document.querySelector('#taskTimeMiddle');

const taskPriorityHigh = document.querySelector('#taskTimeHigh');

// Back Button

const backBotton = document.querySelector('#backBotton');

const noteInner = document.querySelector('#noteInner');

const newNoteInner = document.querySelector('#newNoteInner');

const newTaskButtonNew = document.querySelector('#newTaskButtonNew');

const newTaskButtonAdd = document.querySelector('#newTaskButtonAdd');

// Обертки 1 и 2 

const mainWrapper = document.querySelector('#mainWrapper');

const subWrapper = document.querySelector('#subWrapper');

// Today, tomorrow, all buttons

const todayButton = document.querySelector('#todayButton');

const tomorrowButton = document.querySelector('#tomorrowButton');

const allButton = document.querySelector('#allButton');

 // Tasklist

const taskList = document.querySelector("#taskList");
const taskItem = document.querySelector('.task__item');
const taskListComplete = document.querySelector('#taskListComplete');
const taskItemFaq = document.querySelector('#faq');


// Сохранение задач

let taskMemory = [];

if (localStorage.getItem('taskMemory')) {   
    taskMemory = JSON.parse(localStorage.getItem('taskMemory'));
    taskMemory.forEach( (task) => renderTask(task) );
}


// Добавление задачи
taskForm.addEventListener('submit', addTask, dragAndDrop);

// Удаление задачи
taskList.addEventListener('click', deleteTask);
taskListComplete.addEventListener('click', deleteTask);


// Priority click and result

middle.onclick = function() {
    taskPriorityMiddle.classList.toggle("active");
    taskPriorityHigh.classList.remove("active");
}

high.onclick = function() {
    taskPriorityHigh.classList.toggle("active");
    taskPriorityMiddle.classList.add("active");
}

backAndNewButton();

// Today, tomorrow, all buttons

todayButton.onclick = function() {
    
    todayButton.classList.add("active");
    tomorrowButton.classList.remove("active");
    allButton.classList.remove("active");

    sortItems.forEach((dateItem) => {
        
        const dateItemPropery = dateItem.dataset.item;
        const today = new Date;
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const dateResult = `${year}-${month}-${day}`
        
        console.log(dateResult);

        if(dateItemPropery === dateResult) {
            dateItem.classList.remove('sortHide');
        } else {
            dateItem.classList.add('sortHide')
        }
    })


}

tomorrowButton.onclick = function() {
    
    tomorrowButton.classList.add("active");
    todayButton.classList.remove("active");
    allButton.classList.remove("active");

    sortItems.forEach((dateItem) => {
        const dateItemPropery = new Date (dateItem.dataset.item);
        const today = new Date;

        if(dateItemPropery > today) {
            dateItem.classList.remove('sortHide');
        } else {
            dateItem.classList.add('sortHide')
        }
    })

}

allButton.onclick = function() {
    
    allButton.classList.add("active");
    tomorrowButton.classList.remove("active");
    todayButton.classList.remove("active");

    sortItems.forEach((dateItem) => {
        dateItem.classList.remove('sortHide');
    })
}

function addTask(event) {
    event.preventDefault();

    const taskInputTextResult = taskInputText.value;
    
    const taskInputDateResult = taskInputDate.value;
    
    const checkedColorResult = taskForm.elements["radioColor"].value

    const checkPriorityResult = checkPriority();

    const NewTask = {
        id: Date.now(),
        text: taskInputTextResult,
        date: taskInputDateResult,
        color: checkedColorResult,
        priority: checkPriorityResult,
        done: false,
    }

    taskMemory.push(NewTask);
    saveToLocalstorage();

    renderTask(NewTask);
    taskInputText.value = "";
    taskInputDate.value = "";
    taskInputText.focus();
}

function deleteTask(event) {
  
    if(event.target.dataset.action === 'delete') {
       const parentNode = event.target.closest('.task__item');
       
       const ParNoneId = Number(parentNode.id);
       
       const index = taskMemory.findIndex((task) => task.id === ParNoneId);

       taskMemory.splice(index, 1);

       parentNode.remove();
    }
    saveToLocalstorage()
}

// drag and drop

function dragAndDrop() {

    const dragItems = document.querySelectorAll('.task__item');

    const dropZones = document.querySelectorAll('.taskList__task');

    dragItems.forEach(dragItem => {
        dragItem.addEventListener('dragstart', handlerDragstart);
        dragItem.addEventListener('dragend', handlerDragend);
    })


    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragenter', handlerDragenter);
        dropZone.addEventListener('dragleave', handlerDragleave);
        dropZone.addEventListener('dragover', handlerDragover);
        dropZone.addEventListener('drop', handlerDrop);
        
    })

    function handlerDragstart(event) {
        event.dataTransfer.setData("dragItem", this.dataset.item)
        setTimeout(() => {
            this.classList.add('hide');
        }, 0) 
            
    }

    function handlerDragend() {
        this.classList.remove('hide');
    }

    function handlerDragenter(event) {
        event.preventDefault();
        this.classList.add('hovered');
    }

    function handlerDragleave(event) {
        event.preventDefault();
        this.classList.remove('hovered');
    }

    function handlerDragover(event) {
        event.preventDefault();
    }

    function handlerDrop(event) {
        const dragFlag = event.dataTransfer.getData("dragItem");

        const dragItem = document.querySelector(`[data-item="${dragFlag}"]`);
        
        this.append(dragItem);
        this.classList.remove('hovered');

        const id = Number(dragItem.id);
    
        const task = taskMemory.find( (task) => task.id === id);

        task.done = !task.done;
        dragItem.classList.toggle("complete");
        saveToLocalstorage()

    }
}

dragAndDrop();



// Надпись при первом перетаскивании

taskListComplete.addEventListener("drop", showComplete);
taskList.addEventListener("drop", showComplete);
window.addEventListener("load", showComplete);

function showComplete () {
    if(taskListComplete.children.length > 1) {
        taskItemFaq.classList.add('hide')
    } else if (taskListComplete.children.length <= 1) {
        taskItemFaq.classList.remove('hide');
    }
}

// Сохранение в localStorage

function saveToLocalstorage() {
    localStorage.setItem('taskMemory', JSON.stringify(taskMemory));
}

// Вывод занимаемого времени для задачи в форму

function timeCost(value) {
    if (value === "LowTime") {
        return `<svg class="priority__image active">
        <use xlink:href="#priority"></use>
        </svg>
    <svg class="priority__image">
        <use xlink:href="#priority"></use>
        </svg>
    <svg class="priority__image">
        <use xlink:href="#priority"></use>
        </svg>`
    }

    if (value === 'MiddleTime') {
        return `<svg class="priority__image active">
        <use xlink:href="#priority"></use>
        </svg>
    <svg class="priority__image active">
        <use xlink:href="#priority"></use>
        </svg>
    <svg class="priority__image">
        <use xlink:href="#priority"></use>
        </svg>`
    }

    if(value === "HighTime") {
        return `<svg class="priority__image active">
        <use xlink:href="#priority"></use>
        </svg>
    <svg class="priority__image active">
        <use xlink:href="#priority"></use>
        </svg>
    <svg class="priority__image active">
        <use xlink:href="#priority"></use>
        </svg>`
    }
}

function checkPriority() {
    if (taskPriorityHigh.classList.contains("active") && taskPriorityMiddle.classList.contains("active") ) {
        return "HighTime";
    }

    if (taskPriorityMiddle.classList.contains("active")) {
        return "MiddleTime";
    }

    else {
        return "LowTime";
    }
}

function backAndNewButton() {
    backBotton.onclick = function() {

        subWrapper.classList.add("hide");
        newTaskButtonAdd.classList.add("hide");
        newNoteInner.classList.add("hide");
    
        noteInner.classList.remove("hide");
        mainWrapper.classList.remove("hide");
        newTaskButtonNew.classList.remove("hide");
        location.reload();
    }
    
    newTaskButtonNew.onclick = function() {
    
        subWrapper.classList.remove("hide");
        newTaskButtonAdd.classList.remove("hide");
        newNoteInner.classList.remove("hide");
    
        noteInner.classList.add("hide");
        mainWrapper.classList.add("hide");
        newTaskButtonNew.classList.add("hide");
    }
    saveToLocalstorage()
}

function renderTask(task) {
    let taskDoneClass = task.done ? "complete" : "";

    const BuildHTML = function() {
        return `<div id="${task.id}" class="task__item ${task.color} ${taskDoneClass}" draggable="true" data-item="${task.date}">
        <h3 class="task__text">${task.text} до ${task.date}</h3>
        <button data-action="delete" class="delButton"></button>
        <div class="priority__inner">
            ${timeCost(task.priority)}
        </div>
        </div><!-- task__item -->`;
    }
    
    if(task.done) {
        taskListComplete.insertAdjacentHTML('beforeend', BuildHTML())
    } else {
        taskList.insertAdjacentHTML('beforeend', BuildHTML());
    }
}


const sortItems = document.querySelectorAll('.task__item');

function filter() {
    sortItems.forEach((dateItem) => {
        const dateItemPropery = dateItem.dataset.item;
        if(dateItemPropery === "2022-11-13") {
            dateItem.classList.add('hide');
        }
    })
}
