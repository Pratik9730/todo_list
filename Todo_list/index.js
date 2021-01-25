showtask(); //if items are present then showing always
// intializing the values into the vriables
 addtaskinput = document.getElementById("addtaskinput");
 addtaskbtn = document.getElementById("addtaskbtn");

//function for add todo by getting the values from input box
addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value; //Storing value to the variable
    // checking if user entered blank value then it is not stored in storage
    if(addtaskinputval.trim()!=0){
         webtask = localStorage.getItem("localtask");
        if(webtask == null){// checking is there items stored locally if not then create an empty array.
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask); //if it is present then parse it to the object  
        }
        taskObj.push({'task_name':addtaskinputval, 'completeStatus':false}); //here pushing the value of textox into an array
        localStorage.setItem("localtask", JSON.stringify(taskObj)); //passing the value stored in taskObj into the local storage and stringify because of I passing it in the form of string.
        addtaskinput.value = '';
    }
    showtask();  //calling the function every time after adding the value
})

// showtask
function showtask(){
      webtask = localStorage.getItem("localtask");
    if(webtask == null){  // checking is there items stored locally if not then create an empty array.
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);//if it is present then parse it to the object  
    }
      html = '';//created blank html
    // getting table element
      addedtasklist = document.getElementById("addedtasklist");

     // the values from local storage showing using html
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" class="edit_todo"><i class="fa fa-edit"></i></button></td>
                    <td><button type="button" class="text-success" id=${index}><i class="far fa-check-square"></i></button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="delete_todo"><i class="fa fa-trash"></i></button></td>
                </tr>`;
                 //in first td I have created editask() function and passesthe index of that respective todo on which user clicks
    });
    addedtasklist.innerHTML = html;//this means that show tha value of html variable into the inner html
}

// edittask
function edittask(index){
     saveindex = document.getElementById("saveindex");//storing value into variable
     addtaskbtn = document.getElementById("addtaskbtn"); //storing value into variable
    savetaskbtn = document.getElementById("savetaskbtn"); //storing value into variable
    saveindex.value = index;  //save index value to the html saveIndex hidden attribute
    webtask = localStorage.getItem("localtask");
    taskObj = JSON.parse(webtask);  //value at local storage is copied into taskObj variable
    
    addtaskinput.value = taskObj[index]['task_name'];// the item on which user clicked the value is equal to alue to the input box
    // it simply means on items user clicks that alue is goes to input box.
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
    
}

// for after editing to save value
savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
     addtaskbtn = document.getElementById("addtaskbtn");
     webtask = localStorage.getItem("localtask");
     taskObj = JSON.parse(webtask); 
     saveindex = document.getElementById("saveindex").value;//set input box value to the item which select to be edited
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
        }
      }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    //when user clicks on edit then save button dissappers and plus buttons shows.
    localStorage.setItem("localtask", JSON.stringify(taskObj)); //passing the value stored in taskObj into the local storage and stringify because of I passing it in the form of string.
    //aftervalue replaced making input box blank
    addtaskinput.value='';
    showtask(); //again call for after clicking savetask
})
// deleteitem
function deleteitem(index){
     webtask = localStorage.getItem("localtask");
     taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask(); 
}


// complete task
addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
       
         webtask = localStorage.getItem("localtask");
         taskObj = JSON.parse(webtask);
        
         mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
         mytargetid = mytarget.getAttribute("id");
        
        
        
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
           
            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                  
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                   
                }
              }
       
       // showtask();        
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
    })

    



// deleteall
 deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    savetaskbtn = document.getElementById("savetaskbtn");
    addtaskbtn = document.getElementById("addtaskbtn");
    webtask = localStorage.getItem("localtask");
    taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})


//delete completed

   















