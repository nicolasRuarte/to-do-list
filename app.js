#!/usr/bin/env node  
import proccess from "node:process";
import fs from "node:fs";
import { stringify } from "node:querystring";
import { isStringObject } from "node:util/types";

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

//Testing functions
function checkAndCreateJSON(){
    if(fs.existsSync(jsonDirectory)){
        return;
    }
    else{
      fs.writeFileSync(jsonDirectory, JSON.stringify(defaultJSONvalue));
    }

    console.log("Archivo JSON creado");
}

function checkIdIsValid(id){
  const tasksQuantity = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"})).tasksQuantity;
  const isIdInvalid = id === "" || id < 0 || id > tasksQuantity || isNaN(id);
  if(id === undefined){
    console.log("Error: there was no specified id.")
    return false;
  }else if (isIdInvalid){
    console.log("Error: Invalid id.");
    return false
  }else {
    return true;
  }
}

function checkStringArgumentIsValid(arg){
  if (arg === undefined ){
    console.log("Error: argument needed but not received");
    return false;
  }else if (arg === ""){
    console.log("Error: argument is empty string")
    return false;
  }else {
    return true;
  }

}

//Functionality functions
function addTask(description){
  if (!checkStringArgumentIsValid(description)) return;

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

  console.log(`Task added successfully with ID of ${newTask.id}`)
}

function updateTask(id, updatedDescription){
  if (!checkIdIsValid(id) || !checkStringArgumentIsValid(updatedDescription)) return;

  const tasksList = JSON.parse(fs.readFileSync(jsonDirectory, { encoding: "utf-8" }));
  const datetime = new Date;
  tasksList.tasks[id].description = updatedDescription;
  tasksList.tasks[id].updatedAt = `${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}, ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`; 
  
  fs.writeFileSync(jsonDirectory, JSON.stringify(tasksList));

  console.log(`Task with ID of ${id} updated succesfully`);
}

function markTask(id, option){
  if (!checkIdIsValid(id)) return;

  const jsonParse = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"}));
  let previousStatus = "";

  switch(option){
    case "mark-in-progress":
      previousStatus = jsonParse.tasks[id].status;
      jsonParse.tasks[id].status = "in-progress";
      break;
    case "mark-done":
      previousStatus = jsonParse.tasks[id].status;
      jsonParse.tasks[id].status = "done";
      break;
    case "mark-todo":
      previousStatus = jsonParse.tasks[id].status;
      jsonParse.tasks[id].status = "todo";
      break;
    default:
      console.log("Invalid option");
      break;
  }

  fs.writeFileSync(jsonDirectory, JSON.stringify(jsonParse));
  console.log(`Updated status from ${previousStatus} to ${jsonParse.tasks[id].status} from task with ID of ${id}`);
}

function deleteTask(id){
  if (!checkIdIsValid(id)) return;

  const json = JSON.parse(fs.readFileSync(jsonDirectory, { encoding: "utf-8"}));
  json.tasks.splice(id, 1);
  json.tasksQuantity--;

  for (let i = 0; i < json.tasks.length; i++){
    json.tasks[i].id = i;
  } 
  fs.writeFileSync(jsonDirectory, JSON.stringify(json));

  console.log("Task deleted succesfully");
}

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

  if (tasksToList === undefined || tasksToList.length === 0){
    console.log("No elements found");
    return;
  }

  console.log("Resultado:")
  for (let i = 0; i < tasksToList.length; i++){
    console.log(`ID: ${tasksToList[i].id}
      Description: ${tasksToList[i].description}
      Status: ${tasksToList[i].status}
      Created at: ${tasksToList[i].createdAt}
      Updated at: ${tasksToList[i].updatedAt}
      `)
      
  }
}

function readArgumentList(args){
  switch(args[2]){
    case "add":
      addTask(args[3]);
      break;
    case "update":
      updateTask(args[3], args[4]);
      break;
    case "delete":
      deleteTask(args[3]);
      break;
    case "list":
      listTasks(args[3]);
      break;
    case "mark-in-progress":
      markTask(args[3], "mark-in-progress")
      break;
    case "mark-done":
      markTask(args[3], "mark-done");
      break;
    case "mark-todo":
      markTask(args[3], "mark-todo");
      break;
    default:
      if(args[2] != undefined) console.log(`"${args[2]}" is not a valid method`);
      break;
  }
}

checkAndCreateJSON();
readArgumentList(args);