'use strict';
//creating DoM elements
const inputText=document.querySelector(".inputContainer");
const addButton=document.querySelector(".secondary");
const labelContainer=document.querySelector(".taskName");
const saveButton=document.querySelector(".primary");
const clearButton=document.querySelector(".tertiary");

const todoList=localStorage.getItem("todoItems") ? JSON.parse(localStorage.getItem("todoItems")) : [];

const createTodoItem= (todo) =>{
    const mainDiv=document.createElement("div");
    mainDiv.classList="mb-2";

    const inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=todo.id;
    inputElement.checked=todo.status;
    

    const labelElement=document.createElement("label");
    labelElement.htmlFor=todo.id;
    labelElement.classList.add("checkboxLabel");
    
    const childDiv=document.createElement("div");
    childDiv.classList.add("ms-3","labelStyle");
    
    inputElement.addEventListener('change',function(){
        if(inputElement.checked)
        {
            todo.status=true;
            childDiv.classList.add("checked");
        }
        else
            childDiv.classList.remove("checked");
    });

    const textLabel=document.createElement("p");
    textLabel.className="ms-3 labelText";
    textLabel.textContent=todo.name;


    const buttonElement=document.createElement("button");
    buttonElement.classList.add("ms-auto","me-3","deleteButton");
    buttonElement.onclick= () => {
        todoList.splice(todoList.findIndex((obj) => obj.name===buttonElement.previousSibling.textContent),1);
        localStorage.setItem("todoItems",JSON.stringify(todoList));
        labelContainer.removeChild(mainDiv);
    };

    const deleteIcon=document.createElement("i");
    deleteIcon.classList.add("fa-regular","fa-trash-can");

    buttonElement.appendChild(deleteIcon);
    childDiv.appendChild(textLabel);
    childDiv.appendChild(buttonElement);
    labelElement.appendChild(childDiv);
    mainDiv.appendChild(inputElement);
    mainDiv.appendChild(labelElement);
    labelContainer.appendChild(mainDiv);
}
for(let i=0;i<todoList.length;i++)
    createTodoItem(todoList[i]);

clearButton.onclick=() => {
    localStorage.clear();
    todoList.length=0;
    labelContainer.innerHTML="";
}

saveButton.onclick=() => {
    if(todoList.length === 0)
    {
        alert("Please add any task to save");
        return;
    }
    localStorage.setItem("todoItems",JSON.stringify(todoList));
}


let idCreation=() => `${Date.now()}${Math.round(Math.random()*100)}`;


addButton.onclick= () => {
    const todoName=inputText.value;
    inputText.value=null;
    if(todoName==="")
    {
        alert("Please enter the task to add");
        return;
    }
    const obj=new Object();
    obj.name=todoName;
    obj.status=false;
    const elementId=idCreation();
    obj.id=elementId;
    todoList.push(obj);
    labelContainer.innerHTML="";
    for(let i=0;i<todoList.length;i++)
        createTodoItem(todoList[i]);

}