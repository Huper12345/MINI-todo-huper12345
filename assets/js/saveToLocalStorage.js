"use strict";

export {saveToLocalstorage}

function saveToLocalstorage() {
    localStorage.setItem('taskMemory', JSON.stringify(taskMemory));
}