"use strict";

import { addTask, renderTask, taskForm, taskInputText, taskInputDate, taskInputRadioYellow, taskInputRadioblue, taskInputRadioRed, taskPriorityLow, taskPriorityMiddle, taskPriorityHigh, taskMemory } from "./addTask"

import {backAndNewButton, newTaskButtonNew, newTaskButtonAdd, mainWrapper, subWrapper, backBotton, noteInner, newNoteInner} from "./buttons"

import {deleteTask} from "./deleteTask";

import { dragAndDrop } from "./dragAndDrop";

import {sortItems, todayButton, tomorrowButton, allButton, nowDate, afterTomorrowDate, calcDate} from "./filter"

import {middle, high} from "./taskPriority"

import {timeCost, checkPriority} from "./timeCostAndCheckPriority"

backAndNewButton();
dragAndDrop();




