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

taskForm.addEventListener('submit', function(event) {
    // Отмена отправки формы
    event.preventDefault();
    // Достаем текст из input
    const taskInputTextResult = taskInputText.value;
    
    const taskInputDateResult = taskInputDate.value;
    
    const checkedColor = document.getElementById("#taskForm");

    const checkedColorResult = taskForm.elements["radioColor"].value

    const checkPriorityResult = checkPriority();

    // Выводим данные

    const buildHTML = function() {
    
        if (checkPriorityResult == "LowTime") {
            return `<div class="task__item ${checkedColorResult}">
            <h3 class="task__text">${taskInputTextResult} до ${taskInputDateResult}</h3>
            
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
            return `<div class="task__item ${checkedColorResult}">
            <h3 class="task__text">${taskInputTextResult} до ${taskInputDateResult}</h3>
            
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
            return `<div class="task__item ${checkedColorResult}">
            <h3 class="task__text">${taskInputTextResult} до ${taskInputDateResult}</h3>
            
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

    const taskHTML = buildHTML;

console.log(taskHTML())
})



 



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

