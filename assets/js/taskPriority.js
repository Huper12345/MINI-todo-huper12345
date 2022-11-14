"use strict";

export {middle, high};

middle.onclick = function() {
    taskPriorityMiddle.classList.toggle("active");
    taskPriorityHigh.classList.remove("active");
}

high.onclick = function() {
    taskPriorityHigh.classList.toggle("active");
    taskPriorityMiddle.classList.add("active");
}
