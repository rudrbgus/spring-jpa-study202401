import React, {useState} from "react";
import "./scss/TodoTemplate.scss";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoMain from "./TodoMain";

const TodoTemplate = () => {
    /*
        리액트는 부모컴포넌트에서 자식컴포넌트로의 데이터이동이 반대보다 쉽기 때문에
        할 일 데이터는 상위부모컴포넌트에서 처리하는 것이 좋다.
     */
    const [todoList, setTodoList] = useState([
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
        }]);


    // 데이터 상향식 전달을 위해 부모가 자식에게 함수를 하나 전달
    const addTodo = (todoText) => {
        // console.log('할 일 등록 함수를 todotemplate에서 실행!')
        console.log('todoText:' + todoText);
        todoList.push({
            id: todoList.length + 1,
            title: todoText,
            done: false
        });
        setTodoList([...todoList]);
        console.log(todoList);
    }

    return (
        <div className='TodoTemplate'>
            <TodoHeader/>
            <TodoMain todoList={todoList}/>
            <TodoInput onAdd={addTodo}/>
        </div>
    );
};

export default TodoTemplate;

