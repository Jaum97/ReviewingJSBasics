// all js here
init();

function init() {
    const myul = document.querySelector('#app ul');
    const myinput = document.querySelector('#app input');
    const mybutton = document.querySelector('#app button');
    const todos = JSON.parse(localStorage.getItem('list-todos')) || [];
    createTodos(todos, myul);
    mybutton.onclick = function () {
        todos.push(myinput.value);
        createTodos(todos, myul);
        myinput.value = '';
        saveToStorage(todos);
        console.log(todos);
    }
}

function removeFromArray(myArray, element) {
    for (let i = myArray.length; i--;)(myArray[i] === element) ? (myArray.splice(i, 1), i = 0) : false
}

function createTodos(todoList, ulList) {
    let myli, mya, mynode1, mynode2;

    while (ulList.firstChild) ulList.removeChild(ulList.firstChild);
    for (const x of todoList) {
        myli = document.createElement('li');
        myli.onclick = function () {
            this.parentNode.removeChild(this);
            removeFromArray(todoList, x);
            console.log(todoList);
            saveToStorage(todoList);
        }
        mya = document.createElement('a');
        mynode1 = document.createTextNode(x.valueOf());
        mynode2 = document.createTextNode('test');
        mya.setAttribute('href', '#');
        mya.appendChild(mynode2);
        myli.appendChild(mynode1);
        myli.appendChild(mya);
        ulList.appendChild(myli);
    }
}

const saveToStorage = (todos) => localStorage.setItem('list-todos', JSON.stringify(todos));

