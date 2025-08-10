const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');

const todos = JSON.parse(localStorage.getItem('todos')); // 最初にローカルストレージからデータを取得

if (todos) { // todosが存在する場合、リストに追加
  todos.forEach(todo => {
    add(todo);
  })
} // ローカルストレージに保存されているタスクを表示

form.addEventListener('submit', function(e) {
  e.preventDefault(); 
  add(); 
});

function add(todo) {
  let todoText = input.value;

  if(todo && todo.text) {
    todoText = todo.text;
  } // 引数にtodoがある場合はそのテキストを使用

  if (todoText.length > 0) {
    const li = document.createElement('li');
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    } // 完了状態のタスクには線を引く

    li.addEventListener("contextmenu", function(e) {
      e.preventDefault(); // 右クリックメニューを無効化
      li.remove();
      saveData(); // データを保存
    });

    li.addEventListener("click", function() {
      li.classList.toggle("text-decoration-line-through");
      saveData(); 
    }); // クリックで完了状態を切り替え（これだけだとリロードすると元に戻るため、localStrageに保存する際完了状態もオブジェクトに渡す）

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll('li');
  let todos = [];

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through"),
    }; // 各リストアイテムのテキストと完了状態を取得
    todos.push(todo);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}