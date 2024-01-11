import React from 'react';
import {MdDelete, MdDone, MdDoNotDisturb} from "react-icons/md";
import './scss/TodoItem.scss'
import cn from 'classnames';
const TodoItem = ({item}) => {

    const {id, title, done} = item;

    return (
        <li className='todo-list-item'>
            <div className={cn('check-circle', {"active": done})}>
                {done ? <MdDone/> : <MdDoNotDisturb />}
            </div>
            <span className={cn('text', {"finish":done})}>{title}</span>
            <div className='remove'>
                <MdDelete/>
            </div>
        </li>
    );
};

export default TodoItem;