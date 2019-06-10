var firebaseConfig = {
    apiKey: "AIzaSyDrusYgzY1nDh4P80uKaNNmQv5y4zVAp-k",
    authDomain: "takenlijst-3ea6c.firebaseapp.com",
    databaseURL: "https://takenlijst-3ea6c.firebaseio.com",
    projectId: "takenlijst-3ea6c",
    storageBucket: "takenlijst-3ea6c.appspot.com",
    messagingSenderId: "311361746946",
    appId: "1:311361746946:web:a99c41d74a0fa5d9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var d = new Date();
var t = d.getTime();
var counter =t;

document.getElementById("form").addEventListener("submit",(e)=>{
  var task = document.getElementById("task").value;
  var description = document.getElementById("description").value;
  e.preventDefault();
  createTask(task,description);
  form.reset();
});

function createTask(taskName,description){
  console.log(counter);
  counter+=1;
  console.log(counter);
  var task={
    id:counter,
    task: taskName,
    description:description
  }
  let db= firebase.database().ref("tasks/"+counter);
  db.set(task);
  document.getElementById("cardSection").innerHTML='';
  readTask();
}

function readTask(){
  var task= firebase.database().ref("tasks/");
  task.on("child_added",function(data){
    var taskValue= data.val();

    document.getElementById("cardSection").innerHTML+=`
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${taskValue.task}</h5>
          <p class="card-text">${taskValue.description}</p>
          <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')"><i class="fas fa-edit"></i> Wijzig idee</button>
          <button type="submit"  class="btn btn-danger" onclick="deleteTask(${taskValue.id})"><i class="fas fa-trash-alt"></i> Idee verwijderen</button>
        </div>
      </div>
  `
  });  
}

function reset(){
  document.getElementById("firstSection").innerHTML=`
  <form class="border p-4 mb-4 " id="form">

  <div class="form-group">
    <label >Idee</label>
    <input type="text" class="form-control" id="task" placeholder="Wat is je idee?">
  </div>

  <div class="form-group">
    <label>Omschrijving</label>
    <input type="text" class="form-control" id="description" placeholder="Wat wil je exact doen?">
  </div>

  <button type="submit"  id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> Voeg idee toe</button>
  <button style="display: none" id="button2" class="btn btn-success"> Wijzigingen opslaan</button>
  <button style="display: none" id="button3" class="btn btn-danger"> Niet wijzigen</button>
</form>
  `;

  document.getElementById("form").addEventListener("submit",(e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form.reset();
  });
}

function updateTask(id,name,description){
  document.getElementById("firstSection").innerHTML=`
  <form class="border p-4 mb-4 " id="form2">

  <div class="form-group">
    <label >Idee</label>
    <input type="text" class="form-control" id="task" placeholder="Wat is je idee?">
  </div>

  <div class="form-group">
    <label>Omschrijving</label>
    <input type="text" class="form-control" id="description" placeholder="Wat wil je exact doen?">
  </div>

  <button style="display: none"  id="button1" class="btn btn-primary"> Voeg idee toe</button>
  <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync"></i> Wijzigingen opslaan</button>
  <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i> Niet wijzigen</button>
</form>
  `;
  document.getElementById("form2").addEventListener("submit",(e)=>{
    e.preventDefault();
  });
  document.getElementById("button3").addEventListener("click",(e)=>{
    reset();
  });
  document.getElementById("button2").addEventListener("click",(e)=>{
    updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
  });
  document.getElementById("task").value=name;
  document.getElementById("description").value=description;
}

function updateTask2(id,name,description){
  var taskUpdated={
    task:name,
    id:id,
    description:description
  }
  let db= firebase.database().ref("tasks/"+id);
  db.set(taskUpdated);

  document.getElementById("cardSection").innerHTML='';
  readTask();
  reset();
}
function deleteTask(id){
  var task= firebase.database().ref("tasks/"+id);
  task.remove();
  reset();
  document.getElementById("cardSection").innerHTML='';
  readTask();
}
