import React from 'react';
import './scss/TodoMain.scss';
import TodoItem from "./TodoItem";

const TodoMain = ({todoList, onRemove, onCheck}) => {



    return (
        <ul className='todo-list'>
            {
                todoList.map(todo=> <TodoItem key={todo.id} item={todo} onRemove={onRemove}  onCheck={onCheck}/>)
            }
        </ul>
    );
};

export default TodoMain;