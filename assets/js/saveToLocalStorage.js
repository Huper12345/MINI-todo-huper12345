"use strict";

import { taskMemory } from "./addTask";

export function saveToLocalstorage() {
    localStorage.setItem('taskMemory', JSON.stringify(taskMemory));
}