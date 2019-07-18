// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
    // This is the dom node where we will keep our todo
    var container = document.getElementById('todo-container');
    var addTodoForm = document.getElementById('add-todo');
    
    var state = [

      { id: -3, description: 'Clean Home',done:true },
      { id: -2, description: 'Study React',done:false },
      { id: -1, description: 'Finish Final Project', done: false },

    ]; // this is our initial todoList
  
    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function(todo) {
      var todoNode = document.createElement('li');
      todoNode.setAttribute("id",todo.id);
       var descriptionSpan = document.createElement('span');
      descriptionSpan.textContent=todo.description;
      if(todo.done==true){
          descriptionSpan.setAttribute("class","checked");
      }else{
        descriptionSpan.setAttribute("class","");

      }
      todoNode.appendChild(descriptionSpan) 
     

      
    
      // this ad7kids the delete button
      var deleteButtonNode = document.createElement('button');
      deleteButtonNode.setAttribute('class', 'close');
      var txt = document.createTextNode("\u00D7");
      deleteButtonNode.appendChild(txt);

      deleteButtonNode.addEventListener('click', function(event) {
       var idToDelete=event.target.parentElement.id;

        var newState = todoFunctions.deleteTodo(state, idToDelete);  
        update(newState);
      });
      todoNode.appendChild(deleteButtonNode);     
      return todoNode;
    };
  
    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function(event) {
        // https://developer.mozilla.org/en-US/docs/Web/Events/submit
        
        event.preventDefault();
        var input = document.getElementById("item");
       var inputText = input.value;
       if(inputText == " "||inputText==""){
         return alert("Empty Content, Please write Something !!");
       }
       else if(inputText.length>50){
         alert("You Can Add Max 50 Letters !!");
       }else{
       var newObj=[{id:todoFunctions.generateId(), description:inputText, done:false}];
        newState=todoFunctions.addTodo(state,newObj)
       }
       newState=todoFunctions.sortTodos(newState,sortbyStatus);
       update(newState);
        
       input.value="";
      });
    }
    function sortbyStatus(a, b) {
     return a.done-b.done;
    }  
    // you should not need to change this function
    var update = function(newState) {
      state = newState;
      renderState(state);
    };
  
    // you do not need to change this function
    var renderState = function(state) {
      var todoListNode = document.createElement('ul');
  
      state.forEach(function(todo) {
        
        todoListNode.appendChild(createTodoNode(todo));
      });
      //add check marks id the note checked and changes the status
      todoListNode.addEventListener('click',function(event){
        if (event.target.tagName === 'SPAN') {
          event.target.classList.toggle('checked');
          var elemID=event.target.parentElement.id;

         newState=todoFunctions.markTodo(state, elemID);
         newState=todoFunctions.sortTodos(newState,sortbyStatus)
          update(newState);

        }
      },false);
      // you may want to add a class for css
      container.replaceChild(todoListNode, container.firstChild);
    };
    
    if (container) renderState(state);
  })();