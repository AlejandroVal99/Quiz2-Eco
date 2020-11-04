class Task {
    constructor(task) {
        this.task = task;
    }


    render = () => {
        let taskComponent = document.createElement('div');
        taskComponent.className = "taskComponent";

        let dateTask = document.createElement('p');
        dateTask.className = "datetask";
        dateTask.innerHTML = this.task.date;

        let descriptionTask = document.createElement('p');
        descriptionTask.className = "descriptionTask";
        descriptionTask.innerHTML = this.task.description;

        let btnGoDown = document.createElement('button');
        btnGoDown.className = "btnGoDown button";

        let btnGoUp = document.createElement('button');
        btnGoUp.className = "btnGoUp button";

        let btnGoRemove = document.createElement('button');
        btnGoRemove.className = "btnGoRemove button";


        switch (this.task.state) {
            case "ToDo":
                taskComponent.appendChild(dateTask);
                taskComponent.appendChild(descriptionTask);
                taskComponent.appendChild(btnGoRemove);
                taskComponent.appendChild(btnGoUp);
                break;

            case 'Doing':
                taskComponent.appendChild(dateTask);
                taskComponent.appendChild(descriptionTask);
                taskComponent.appendChild(btnGoRemove);
                taskComponent.appendChild(btnGoUp);
                taskComponent.appendChild(btnGoDown);
                break;

            case 'Done':
                taskComponent.appendChild(dateTask);
                taskComponent.appendChild(descriptionTask);
                taskComponent.appendChild(btnGoRemove);
                taskComponent.appendChild(btnGoDown);
                break;
        }




        btnGoDown.addEventListener('click', () => {

            let state = this.task.state;
            let id = this.task.id;
            database.ref('tasks/tasks' + state + '/' + id).set(null);

            if (state === "Doing") {

                let i = this.task.id;
                let t = this.task.date;
                let s = 'ToDo'
                let d = this.task.description;


                let newTaskToDo = {
                    id: i,
                    date: t,
                    state: s,
                    description: d,
                }

                database.ref('tasks/tasksToDo/' + i).set(newTaskToDo);

            } else {

                let i = this.task.id;
                let t = this.task.date;
                let s = 'Doing'
                let d = this.task.description;


                let newTaskDoing = {
                    id: i,
                    date: t,
                    state: s,
                    description: d,
                }

                database.ref('tasks/tasksDoing/' + i).set(newTaskDoing);
            }
        });



        btnGoUp.addEventListener('click', () => {
            let state = this.task.state;
            let id = this.task.id;
            database.ref('tasks/tasks' + state + '/' + id).set(null);
            console.log("Mi estado actual: " + this.task.state);

            if (state === "ToDo") {

                let i = this.task.id;
                let t = this.task.date;
                let s = 'Doing'
                let d = this.task.description;


                let newTaskDoing = {
                    id: i,
                    date: t,
                    state: s,
                    description: d,
                }

                database.ref('tasks/tasksDoing/' + i).set(newTaskDoing);
            } else {

                let i = this.task.id;
                let t = this.task.date;
                let s = 'Done'
                let d = this.task.description;


                let newTaskDone = {
                    id: i,
                    date: t,
                    state: s,
                    description: d,
                }

                database.ref('tasks/tasksDone/' + i).set(newTaskDone);
            }
        });

        btnGoRemove.addEventListener('click', () => {

            let state = this.task.state;
            let id = this.task.id;
            database.ref('tasks/tasks' + state + '/' + id).set(null);

        });


        taskComponent.addEventListener('drop', function (event) {
            console.log(event.target.id);
            let dragged;
            event.preventDefault();

            switch (event.target.id) {

                case "container_taskDoing":
                    if (this.task.state !== 'Doing') {

                        dragged.parentNode.removeChild(dragged);
                        event.target.appendChild(dragged);

                        let state = this.task.state;
                        let id = this.task.id;
                        database.ref('tasks/tasks' + state + '/' + id).set(null);
                        console.log("Mi estado actual: " + this.task.state);

                        let i = this.task.id;
                        let t = this.task.date;
                        let s = 'Doing'
                        let d = this.task.description;


                        let newTaskDoing = {
                            id: i,
                            date: t,
                            state: s,
                            description: d,
                        }

                        database.ref('tasks/tasksDoing/' + i).set(newTaskDoing);

                    }
                    break;

                case "container_taskDone":
                    if (this.task.state !== 'Done') {
                        dragged.parentNode.removeChild(dragged);
                        event.target.appendChild(dragged);

                        let state = this.task.state;
                        let id = this.task.id;
                        database.ref('tasks/tasks' + state + '/' + id).set(null);
                        console.log("Mi estado actual: " + this.state);

                        let i = this.task.id;
                        let t = this.task.date;
                        let s = 'Done'
                        let d = this.task.description;


                        let newTaskDone = {
                            id: i,
                            date: t,
                            state: s,
                            description: d,
                        }

                        database.ref('tasks/tasksDone/' + i).set(newTaskDone);

                    }
                    break;

                case "container_taskToDo":

                    if (this.task.state !== 'ToDo') {

                        dragged.parentNode.removeChild(dragged);
                        event.target.appendChild(dragged);

                        let state = this.task.state;
                        let id = this.task.id;
                        database.ref('tasks/tasks' + state + '/' + id).set(null);



                        let i = this.task.id;
                        let t = this.task.date;
                        let s = 'ToDo'
                        let d = this.task.description;


                        let newTaskToDo = {
                            id: i,
                            date: t,
                            state: s,
                            description: d,
                        }

                        database.ref('tasks/tasksToDo/' + i).set(newTaskToDo);

                    }
                    break;

            }
        }, false);

        return taskComponent;

    }
}