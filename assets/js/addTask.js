"use strict";

import { timeCost, checkPriority } from "./timeCostAndCheckPriority"
import { dragAndDrop } from "./dragAndDrop";
import { deleteTask } from "./deleteTask";
import { saveToLocalstorage } from "./saveToLocalStorage";

export {addTask, renderTask, taskForm, taskInputText, taskListComplete, taskList, taskInputDate, taskInputRadioYellow, taskInputRadioblue, taskInputRadioRed, taskPriorityLow, taskPriorityMiddle, taskPriorityHigh, taskMemory, }

const taskForm = document.querySelector('#taskForm');

const taskInputText = document.querySelector('#taskInputText');

const taskInputDate = document.querySelector('#taskInputDate ');

const taskInputRadioblue = document.querySelector('#taskInputRadioblue');

const taskInputRadioYellow = document.querySelector('#taskInputRadioYellow');

const taskInputRadioRed = document.querySelector('#taskInputRadioRed');

const taskPriorityLow = document.querySelector('#taskTimeLow');

const taskPriorityMiddle = document.querySelector('#taskTimeMiddle');

const taskPriorityHigh = document.querySelector('#taskTimeHigh');

const taskList = document.querySelector("#taskList");
const taskListComplete = document.querySelector('#taskListComplete');


let taskMemory = [];

if (localStorage.getItem('taskMemory')) {   
    taskMemory = JSON.parse(localStorage.getItem('taskMemory'));
    taskMemory.forEach( (task) => renderTask(task) );
}

taskForm.addEventListener('submit', addTask, dragAndDrop);
taskList.addEventListener('click', deleteTask);
taskListComplete.addEventListener('click', deleteTask);


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
