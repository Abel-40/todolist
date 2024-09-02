let todoContainer =JSON.parse(localStorage.getItem('todoContainer'))||[];
let addBtu = document.querySelector('.addBtu');

function addTodo(){
  localStorage.setItem('todoContainer',JSON.stringify(todoContainer));
  let userTodo = document.querySelector('.fieldJs');
  let todoDate = document.querySelector('.dateJs');
  let errorWarn = document.querySelector('.errorJs');
  let successfulWarn = document.querySelector('.successfulJs');

  let toDoName = userTodo.value;
  let doDate = todoDate.value;
   
  if(toDoName.length>5&&doDate.length===10){
    todoContainer.push({toDoName,doDate});
    todoDisplay();
    successfulWarn.innerHTML="<P>Todo Added Successfully!!!</P>";
    setTimeout(() => {
      successfulWarn.innerHTML="";
    }, 1000);
    localStorage.setItem('todoContainer',JSON.stringify(todoContainer));
    userTodo.value="";
    todoDate.value="";
   userTodo.addEventListener('click',()=>{
    successfulWarn.innerHTML="";
    errorWarn.innerHTML="";
   })
  }else{
    setTimeout(() => {
      errorWarn.innerHTML="";
    }, 1000);
    errorWarn.innerHTML=" <p>!!! Please input all data</p>";
  }

}
addBtu.addEventListener('click',()=>{
  addTodo();
})

function todoDisplay(){
  let todoList = document.querySelector('.todoListJs');
  console.log(todoContainer);
  let collector = "";
  todoContainer.forEach((eachTodo,item)=>{
    let {toDoName, doDate}= eachTodo;
    collector += `<div class="todo">
    <p class=" titleJs">${toDoName}</p>
    <p>${doDate}</p>
    <button class="done">done</button>
    <button class="delete">delete</button>
  </div>`;
  });
 
  todoList.innerHTML=collector;

let doneBtu = document.querySelectorAll('.done');
let deleteBtu = document.querySelectorAll('.delete');
doneBtu.forEach((each,index)=>{
  each.addEventListener('click',() =>{
    document.querySelectorAll('.titleJs')[index].classList.toggle('completed');
    each.disabled=true;
  });
});
deleteBtu.forEach((each,index)=>{
  each.addEventListener('click',()=>{
    todoContainer.splice(index,1);
    localStorage.removeItem('todoContainer');
    todoDisplay();
  })
  
})
}
todoDisplay();