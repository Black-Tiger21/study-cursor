document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // 로컬 스토리지에서 할일 목록 불러오기
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // 할일 목록 렌더링
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = `flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 transition-all ${
                todo.completed ? 'opacity-75' : ''
            }`;
            
            const leftSection = document.createElement('div');
            leftSection.className = 'flex items-center space-x-3';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'w-5 h-5 text-blue-500 rounded focus:ring-blue-500';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));
            
            const span = document.createElement('span');
            span.className = `text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`;
            span.textContent = todo.text;
            
            leftSection.appendChild(checkbox);
            leftSection.appendChild(span);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'text-red-500 hover:text-red-700 focus:outline-none transition-colors';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener('click', () => deleteTodo(index));
            
            todoItem.appendChild(leftSection);
            todoItem.appendChild(deleteButton);
            todoList.appendChild(todoItem);
        });
        
        // 로컬 스토리지에 저장
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 할일 추가
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            renderTodos();
            
            // 입력 필드에 포커스
            todoInput.focus();
        }
    }

    // 할일 삭제
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    // 할일 완료 상태 토글
    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    // 이벤트 리스너 등록
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // 초기 렌더링
    renderTodos();
});
