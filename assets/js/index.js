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

//  Drag and drop

const taskListComplete = document.querySelector('#taskListComplete');
const taskListAll = document.querySelector('.taskList__task');

const taskItem = document.querySelector('.task__item');

// Добавление задачи
taskForm.addEventListener('submit', addTask)


// Удаление задачи
taskList.addEventListener('click', deleteTask)



// Priority click and result

middle.onclick = function() {
    taskPriorityMiddle.classList.toggle("active");
    taskPriorityHigh.classList.remove("active")
}

high.onclick = function() {
    taskPriorityHigh.classList.toggle("active");
    taskPriorityMiddle.classList.add("active");
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

// Back Button

backBotton.onclick = function() {

    subWrapper.classList.remove("visible");
    newTaskButtonAdd.classList.remove("visible");
    newNoteInner.classList.remove("visible");

    noteInner.classList.add("visible");
    mainWrapper.classList.add("visible");
    newTaskButtonNew.classList.add("visible");
}

//New Button

newTaskButtonNew.onclick = function() {

    subWrapper.classList.add("visible");
    newTaskButtonAdd.classList.add("visible");
    newNoteInner.classList.add("visible");

    noteInner.classList.remove("visible");
    mainWrapper.classList.remove("visible");
    newTaskButtonNew.classList.remove("visible");
}

// Today, tomorrow, all buttons

todayButton.onclick = function() {
    
    todayButton.classList.add("active");
    tomorrowButton.classList.remove("active");
    allButton.classList.remove("active");

}

tomorrowButton.onclick = function() {
    
    tomorrowButton.classList.add("active");
    todayButton.classList.remove("active");
    allButton.classList.remove("active");
}

allButton.onclick = function() {
    
    allButton.classList.add("active");
    tomorrowButton.classList.remove("active");
    todayButton.classList.remove("active");
    
}


function addTask(event) {
    // Отмена отправки формы
    event.preventDefault();
    // Достаем текст из input
    const taskInputTextResult = taskInputText.value;
    
    const taskInputDateResult = taskInputDate.value;
    
    const checkedColor = document.getElementById("#taskForm");

    const checkedColorResult = taskForm.elements["radioColor"].value

    const checkPriorityResult = checkPriority();

    // Выводим данные

    const BuildHTML = function() {
    
        if (checkPriorityResult == "LowTime") {
            return `<div class="task__item ${checkedColorResult}" draggable="true" data-item="${taskInputDateResult}">
            <h3 class="task__text">${taskInputTextResult} до ${taskInputDateResult}</h3>
            <button data-action="delete" class="delButton"></button>
            <div class="priority__inner">
                <svg class="priority__image active">
                    <use xlink:href="#priority"></use>
                    </svg>
                <svg class="priority__image">
                    <use xlink:href="#priority"></use>
                    </svg>
                <svg class="priority__image">
                    <use xlink:href="#priority"></use>
                    </svg>
            </div>
        </div><!-- task__item -->`;
        }
    
        if (checkPriorityResult == "MiddleTime") {
            return `<div class="task__item ${checkedColorResult}" draggable="true" data-item="${taskInputDateResult}">
            <h3 class="task__text">${taskInputTextResult} до ${taskInputDateResult}</h3>
            <button data-action="delete" class="delButton"></button>
            <div class="priority__inner">
                <svg class="priority__image active">
                    <use xlink:href="#priority"></use>
                    </svg>
                <svg class="priority__image active">
                    <use xlink:href="#priority"></use>
                    </svg>
                <svg class="priority__image">
                    <use xlink:href="#priority"></use>
                    </svg>
            </div>
        </div><!-- task__item -->`;
        }
    
        if (checkPriorityResult == "HighTime") {
            return `<div class="task__item ${checkedColorResult}" draggable="true" data-item="${taskInputDateResult}">
            <h3 class="task__text">${taskInputTextResult} до ${taskInputDateResult}</h3>
            <button data-action="delete" class="delButton"></button>
            <div class="priority__inner">
                <svg class="priority__image active">
                    <use xlink:href="#priority"></use>
                    </svg>
                <svg class="priority__image active">
                    <use xlink:href="#priority"></use>
                    </svg>
                <svg class="priority__image active">
                    <use xlink:href="#priority"></use>
                    </svg>
            </div>
        </div><!-- task__item -->`;
        }
    }


    // Добавляем задачу на страницу

    taskList.insertAdjacentHTML('beforeend', BuildHTML());

    // Очищаем input
    taskInputText.value = "";
    taskInputDate.value = "";
    taskInputText.focus()
    
}


// Удаляем кнопку

function deleteTask(event) {
  
    if(event.target.dataset.action === 'delete') {
       const parentNode = event.target.closest('.task__item');
       parentNode.remove();
    }
}

// drag and drop

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

function handlerDragend(event) {
    this.classList.remove('hide');
}

function handlerDrag(event) {
    console.log("drag");
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
}