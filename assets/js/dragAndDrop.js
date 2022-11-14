"use strict";

export {dragAndDrop}
import { saveToLocalstorage } from "./saveToLocalStorage";

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

    function handlerDragend() {
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
        this.classList.remove('hovered');

        const id = Number(dragItem.id);
    
        const task = taskMemory.find( (task) => task.id === id);

        task.done = !task.done;
        dragItem.classList.toggle("complete");
        saveToLocalstorage()

    }
}