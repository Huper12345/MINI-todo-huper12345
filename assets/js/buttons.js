"use strict";

import { saveToLocalstorage } from "./saveToLocalStorage"

export {backAndNewButton, newTaskButtonNew, newTaskButtonAdd, mainWrapper, subWrapper, backBotton, noteInner, newNoteInner }

const newTaskButtonNew = document.querySelector('#newTaskButtonNew');

const newTaskButtonAdd = document.querySelector('#newTaskButtonAdd');

const mainWrapper = document.querySelector('#mainWrapper');

const subWrapper = document.querySelector('#subWrapper');

const backBotton = document.querySelector('#backBotton');

const noteInner = document.querySelector('#noteInner');

const newNoteInner = document.querySelector('#newNoteInner');

function backAndNewButton() {
    backBotton.onclick = function() {

        subWrapper.classList.add("hide");
        newTaskButtonAdd.classList.add("hide");
        newNoteInner.classList.add("hide");
    
        noteInner.classList.remove("hide");
        mainWrapper.classList.remove("hide");
        newTaskButtonNew.classList.remove("hide");
        location.reload();
    }
    
    newTaskButtonNew.onclick = function() {
    
        subWrapper.classList.remove("hide");
        newTaskButtonAdd.classList.remove("hide");
        newNoteInner.classList.remove("hide");
    
        noteInner.classList.add("hide");
        mainWrapper.classList.add("hide");
        newTaskButtonNew.classList.add("hide");
    }
    saveToLocalstorage()
}
