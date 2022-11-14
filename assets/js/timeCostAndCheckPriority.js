"use strict";

export {timeCost, checkPriority}
import {taskPriorityHigh} from "./addTask"
import {taskPriorityMiddle} from "./addTask"

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