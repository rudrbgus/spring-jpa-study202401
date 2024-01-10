import React from 'react';
import './scss/TodoMain.scss';
import TodoItem from "./TodoItem";

const TodoMain = () => {

    const todoList = [
        {
            id: 1,
            title: '장보기',
            done: false
        },
        {
            id: 2,
            title: '저녁먹기',
            done: true
        },
        {
            id: 3,
            title: '수다떨기',
            done: false
        },
        {
            id: 4,
            title: '축구하기',
            done: false
        }
    ]

    return (
        <ul className='todo-list'>
            {
                todoList.map(todo=> <TodoItem key={todo.id} item={todo}/>)
            }
        </ul>
    );
};

export default TodoMain;