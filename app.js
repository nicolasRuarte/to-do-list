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
let tasksQuantity = 0;

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

function updateTask(id, attribute, update){
  const tasksList = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"}));


}

function deleteTask(id){}

function listTasks(){
  const tasksList = JSON.parse(fs.readFileSync(jsonDirectory, {encoding: "utf-8"}));

  console.log(tasksList.tasks);
}

function readArgumentList(args){
  switch(args[2]){
    case "add":
      createTask(args[3]);
      break;
    case "update":
      console.log("update");
      break;
    case "delete":
      console.log("delete")
      break;
    case "list":
      listTasks();
      break;
    default:
      if(args[2] != undefined) console.log(`"${args[2]}" is not a valid method`);
      break;
  }
}

checkAndCreateJSON();
readArgumentList(args);