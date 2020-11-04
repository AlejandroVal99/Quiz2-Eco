const btnNewtask = document.getElementById("btnNewTask");
const inputDescripTask = document.getElementById("descriptionTask");
const container_taskToDo = document.getElementById("container_taskToDo");
const container_taskDoing = document.getElementById("container_taskDoing");
const container_taskDone = document.getElementById("container_taskDone");


addNewTask = () => {
    if (inputDescripTask.value === "") {
        alert("No tienes la descripcion de la tarea");
    } else {

        let d = inputDescripTask.value;
        let s = 'ToDo';

        let date = new Date();
        let day = date.getUTCDate();
        let mounth = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();

        let t = day + "-" + mounth + "-" + year;

        let reference = database.ref('tasks/tasksToDo').push();

        let newTask = {

            description: d,
            date: t,
            state:s,
            id: reference.key,

        }
        inputDescripTask.value = "";
        console.log(newTask);

        reference.set(newTask);


    }
}

btnNewtask.addEventListener('click', addNewTask);

database.ref('tasks/tasksToDo').on('value',function(data){
    container_taskToDo.innerHTML = '';
    let titleTask = document.createElement('h2');
    titleTask.innerHTML ="To Do";
    container_taskToDo.appendChild(titleTask);
    data.forEach(
        taskN => {
        let taskData = taskN.val();
        let taskToDo = new Task(taskData);
        container_taskToDo.appendChild(taskToDo.render());
    });
})

database.ref('tasks/tasksDone').on('value',function(data){
    container_taskDone.innerHTML = '';
    let titleTask = document.createElement('h2');
    titleTask.innerHTML ="Done";
    container_taskDone.appendChild(titleTask);
    data.forEach(
        taskN => {
        let taskData = taskN.val();
        let taskDone = new Task(taskData);
        container_taskDone.appendChild(taskDone.render());
    });
})

database.ref('tasks/tasksDoing').on('value',function(data){
    container_taskDoing.innerHTML = '';
    let titleTask = document.createElement('h2');
    titleTask.innerHTML ="Doing";
    container_taskDoing.appendChild(titleTask);

    data.forEach(
        taskN => {
        let taskData = taskN.val();
        let taskDoing = new Task(taskData);
        container_taskDoing.appendChild(taskDoing.render());
    });
})