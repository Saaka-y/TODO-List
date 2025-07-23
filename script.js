const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  console.log(input.value);
  add(); 
});

function add() {
  let todoText = input.value.trim();
  if(todoText === '') {
    alert('Please enter a task');
  } else {
    const li = document.createElement('li');
    li.innerText = todoText;
    li.classList.add("list-group-item");
    ul.appendChild(li);
    todoText = ''; 
    saveData();
  }
};

function saveData() {
  const lists = document.querySelectorAll('li');
  let todos = [];
  lists.forEach(list => {
    todos.push(list.innerText);
  })
}

