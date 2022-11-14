"use strict";

export {sortItems, todayButton, tomorrowButton, allButton, nowDate, afterTomorrowDate, calcDate }

const todayButton = document.querySelector('#todayButton');

const tomorrowButton = document.querySelector('#tomorrowButton');

const allButton = document.querySelector('#allButton');

const sortItems = document.querySelectorAll('.task__item');

todayButton.onclick = function() {
    
    todayButton.classList.add("active");
    tomorrowButton.classList.remove("active");
    allButton.classList.remove("active");

    sortItems.forEach((dateItem) => {
        
        const dateItemProperty = new Date (dateItem.dataset.item);
        const dateItemPropertyValue = calcDate(dateItemProperty);
    
        if(dateItemPropertyValue === nowDate()) {
            dateItem.classList.remove('sortHide');
        } else {
            dateItem.classList.add('sortHide')

        }
    })
}

tomorrowButton.onclick = function() {
    
    tomorrowButton.classList.add("active");
    todayButton.classList.remove("active");
    allButton.classList.remove("active");

    sortItems.forEach((dateItem) => {
        const dateItemPropery = new Date(dateItem.dataset.item);
        const dateTomorrow = calcDate(dateItemPropery);
    
        if(dateTomorrow > nowDate() && dateTomorrow <= afterTomorrowDate()) {
            dateItem.classList.remove('sortHide');
        } else {
            dateItem.classList.add('sortHide')
        }
    })

}

allButton.onclick = function() {
    
    allButton.classList.add("active");
    tomorrowButton.classList.remove("active");
    todayButton.classList.remove("active");

    sortItems.forEach((dateItem) => {
        dateItem.classList.remove('sortHide');
    })
}

// Функции фильтра
function nowDate() {
    const today = new Date;
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const dateResult = year + month + day

    return Number(dateResult);
}

function calcDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateResult = year + month + day

    return Number(dateResult);
}

function afterTomorrowDate() {
    const today = new Date;
    const day = today.getDate() + 1;
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const dateResult = year + month + day

    return Number(dateResult);
}