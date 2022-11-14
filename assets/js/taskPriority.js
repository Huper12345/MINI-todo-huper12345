"use strict";

export {middle1, high1};
import { taskPriorityHigh } from "./addTask";
import { taskPriorityMiddle } from "./addTask";

const middle1 = middle.onclick = function() {
    taskPriorityMiddle.classList.toggle("active");
    taskPriorityHigh.classList.remove("active");
}

const high1 = high.onclick = function() {
    taskPriorityHigh.classList.toggle("active");
    taskPriorityMiddle.classList.add("active");
}
