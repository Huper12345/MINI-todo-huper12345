"use strict";

export {deleteTask}
import { saveToLocalstorage } from "./saveToLocalStorage";
import {taskMemory} from "./addTask"

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