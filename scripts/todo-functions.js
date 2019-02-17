'use strict'

// fetch existing todos from local storage
const getSavedTodos = () =>{
    const todosJSON = localStorage.getItem('todos');
    try{
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e){
        return [];
    }
    
    
}

// save todos to local storage
const saveTodos = (todos) =>{
    localStorage.setItem('todos',JSON.stringify(todos))
}

// render application todos basd on filters
const renderTodos = (todos, filters) => {
    const todoElement = document.querySelector('#todos')
    const filteredTodos = todos.filter( (todo) => {
        const searchMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleatedMatch = !filters.hideCompleted || !todo.isCompleated;
        return searchMatch && hideCompleatedMatch;
    });

    const incompleateTodos = filteredTodos.filter((todo) => !todo.isCompleated)

    todoElement.innerHTML = '';
    todoElement.appendChild(generateSummaryDOM(incompleateTodos));
    
    if(filteredTodos.length > 0){
        filteredTodos.forEach( (todo, index) => {
            todoElement.appendChild(generateTodoDOM(todo, index));
        })
    } else {
        const noTodos = document.createElement('p')
        noTodos.classList.add('empty-message')
        noTodos.textContent = 'No to-does to show'
        todoElement.appendChild(noTodos)
    }
    
}

// removes a todo from list
const removeTodo = (id) =>{
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex > -1){
        todos.splice(todoIndex, 1);
    }
}

// toggle the completed value for a todo
const toggleTodo = (id) =>{
    const todo = todos.find( (todo) => todo.id === id)
    
    if(todo){
        todo.isCompleated = !todo.isCompleated;
    }
}


//get the fom elements for an indevidual note
const generateTodoDOM = (todo) =>{
    const todoElement = document.createElement('label');
    const containerElement = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const deleteButton = document.createElement('button');

    //setup todo checkbox
    checkbox.setAttribute('type','checkbox');
    checkbox.checked = todo.isCompleated;
    containerElement.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);            
        });
    
    

    //setup todo text 
    todoText.textContent = todo.text;
    containerElement.appendChild(todoText);

    //setup container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)

    //setup delete button 
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('button', 'button--text')
    deleteButton.addEventListener('click', ()=>{
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
    todoElement.appendChild(deleteButton)

    

    return todoElement;
}


// 
const generateSummaryDOM = (incompleateTodos) =>{
    const summary = document.createElement('h2');
    summary.classList.add('list-title')
    const plural = incompleateTodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompleateTodos.length} todo${plural} Left`
    return summary;
}

