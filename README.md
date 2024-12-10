# Tasks

Tasks is an application to manage your tasks, you can view all your tasks, check their status and mark them as done or in progress.
Made as a solution to the Task Tracker project for backend from the website [roadmap.sh](roadmap.sh)

## Usage
To use the application you'll need to write its name on the terminal and pass the arguments of the action you want to do. For example, if you want to create a task you you type this into the console: `tasks add "New task"`

### List of options
* `add`: adds a new task with a description prompted by the user. Receives as argument the description of the task.
* `delete`: deletes a task. Receives as argument the id of the task you want to delete.
* `update`: updates the description of an already existing task. Receives as argument the id of the task you want to delete and the new description.

For marking tasks you need to use the following:
* `mark-in-progress`: Marks the selected as in progress. Receives as argument the id of task you want to mark.
* `mark-done`: Marks the selected task as done. Receives as argument the id of the task you want to mark.
* `mark-todo`: Marks the selected task as to do. Receives as argument the id of the task you want to mark.

For listing tasks you can use the `list` option:
* `list`: List all tasks created.
* `list done`: Lists all tasks with status of done.
* `list in-progress`: Lists all tasks with status of in-progress.
* `list todo`: Lists all tasks with status of todo.