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

function checkAndCreateJSON(){
    const tasksJSON = "./tasks.json";
    const defaultJSONvalue = "[]";

    if(fs.existsSync(tasksJSON)){
        return;
    }
    else{
      fs.writeFileSync("./tasks.json", defaultJSONvalue);
    }
}

function readArgumentList(args){
  switch(args[2]){
    case "add":
  }
}

checkAndCreateJSON();