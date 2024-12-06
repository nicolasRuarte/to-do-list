#!/usr/bin/env node  
import proccess from "node:process";
import fs from "node:fs";

/*
  Tasks properties
  id
  description
  status (to do, in progress, done)
  createdAt (date and time)
  updatedAt (date and time of last update)
*/
const args = proccess.argv;
const jsonDirectory = "./tasks.json";
const defaultJSONvalue =  { tasksQuantity: 0, tasks: [] } ;

function checkAndCreateJSON(){
    if(fs.existsSync(jsonDirectory)){
        return;
    }
    else{
      fs.writeFileSync(jsonDirectory, JSON.stringify(defaultJSONvalue));
    }

    console.log("Archivo JSON creado");
}

function createTask(description){
  if (description === "" || description === undefined){
    console.error("Add a description of your task!");
    return;
  }

  let tasksList = fs.readFileSync(jsonDirectory, { encoding: "utf-8"});
  const tasksListParse = JSON.parse(tasksList);
  const datetime = new Date;

  tasksListParse.tasksQuantity++;
  const newTask = {
    id: tasksListParse.tasksQuantity != 0 ? tasksListParse.tasksQuantity - 1 : 0 ,
    description: description,
    status: "todo",
    createdAt: `${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}, ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`,
    updatedAt: "-"
  }

  tasksListParse.tasks.push(newTask);
  fs.writeFileSync(jsonDirectory, JSON.stringify(tasksListParse));

  console.log(`\nTask added successfully with ID of ${tasksQuantity}`)
}

function updateTask(id, updatedDescription){
  const tasksQuantity = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"})).tasksQuantity;
  const isInvalidId = parseInt(id) === NaN || id === undefined || id < 0 || id > tasksQuantity;
  const isDescriptionInvalid = updatedDescription === "" || updatedDescription === undefined;
  if(isInvalidId || isDescriptionInvalid){
    console.log("Error: Invalid id or description");
    return;
  }

  const tasksList = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"}));
  tasksList.tasks[id] = updatedDescription;
}

function markTask(option, id){
  const tasksList = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"})).tasks;
  let previousStatus = "";

  switch(option){
    case "mark-in-progress":
      previousStatus = tasksList[id].status;
      tasksList[id].status = "in-progress";
    case "mark-done":
      tasksList[id].status = "done";
    case "mark-todo":
      tasksList[id].status = "todo";
  }
}

function deleteTask(id){}

function listTasks(selector){
  const tasksList = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"})).tasks;
  let tasksToList = [];

  switch(selector){
    case "done":
      tasksList.forEach(task => {
        if (task.status === "done"){
          tasksToList.push(task);
        }
      });
      break;
    case "todo":
      tasksList.forEach(task => {
        if (task.status === "todo"){
          tasksToList.push(task);
        }
      });
      break;
    case "in-progress":
      tasksList.forEach(task => {
        if (task.status === "in-progress"){
          tasksToList.push(task);
        }
      });
      break;
    case undefined:
      tasksToList = tasksList;
      break;
    default:
      console.log(`Invalid argument. Use "done", "todo" or "in-progress" instead.`)
      break;
  }

  console.log(tasksToList);
}

function readArgumentList(args){
  switch(args[2]){
    case "add":
      createTask(args[3]);
      break;
    case "update":
      updateTask(args[3], args[4]);
      break;
    case "delete":
      console.log("delete")
      break;
    case "list":
      listTasks(args[3]);
      break;
    case "mark-in-progress":
      markTask("mark-in-progress")
    case "mark-done":
      console.log("mark-done")
    case "mark-todo":
      console.log("mark-todo")
    default:
      if(args[2] != undefined) console.log(`"${args[2]}" is not a valid method`);
      break;
  }
}

checkAndCreateJSON();
readArgumentList(args);