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

// Сохранение задач

let taskMemory = [];

// Добавление задачи
taskForm.addEventListener('submit', addTask, dragAndDrop)

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
    event.preventDefault();

    // Получаем данные

    const taskInputTextResult = taskInputText.value;
    
    const taskInputDateResult = taskInputDate.value;
    
    const checkedColor = document.getElementById("#taskForm");

    const checkedColorResult = taskForm.elements["radioColor"].value

    const checkPriorityResult = checkPriority();

// Обьект для задачи
    const NewTask = {
        id: Date.now(),
        text: taskInputTextResult,
        date: taskInputDateResult,
        color: checkedColorResult,
        priority: checkPriorityResult,
        done: false,
    }

    taskMemory.push(NewTask);

    // Формируем css класс
    
    const taskComplete = NewTask.done ? "task__item complete" : "task__item";

    // Строим html разметку

    const BuildHTML = function() {
    
        if (checkPriorityResult == "LowTime") {
            return `<div id="${NewTask.id}" class="${taskComplete} ${NewTask.color}" draggable="true" data-item="${NewTask.date}">
            <h3 class="task__text">${NewTask.text} до ${NewTask.date}</h3>
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
            return `<div id="${NewTask.id}" class="${taskComplete} ${NewTask.color}" draggable="true" data-item="${NewTask.date}">
            <h3 class="task__text">${NewTask.text} до ${NewTask.date}</h3>
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
            return `<div id="${NewTask.id}" class="${taskComplete} ${NewTask.color}" draggable="true" data-item="${NewTask.date}">
            <h3 class="task__text">${NewTask.text} до ${NewTask.date}</h3>
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

    taskList.insertAdjacentHTML('beforeend', BuildHTML());

    taskInputText.value = "";
    taskInputDate.value = "";
    taskInputText.focus();
}


// Удаляем кнопку

function deleteTask(event) {
  
    if(event.target.dataset.action === 'delete') {
       const parentNode = event.target.closest('.task__item');
       parentNode.remove();
    }
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

    function handlerDragend(event) {
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
        this.classList.remove('hovered')
    }

}

dragAndDrop();

