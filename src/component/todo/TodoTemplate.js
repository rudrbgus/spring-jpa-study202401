import React, {useEffect, useState} from "react";
import "./scss/TodoTemplate.scss";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoMain from "./TodoMain";
import {TODO_URL, AUTH_URL} from "../config/host-config";
import {getCurrentLoginUser, ROLE, TOKEN} from "../util/login-util";
import header from "../layout/header";
import {useNavigate} from "react-router-dom";
import { Spinner } from "reactstrap";

const TodoTemplate = () => {

    // 로딩 완료 상태값 관리
    const [ loading, setLoading] = useState(true);

    const redirection = useNavigate();


    // 토큰 가져오기
    const [token, setToken] = useState(getCurrentLoginUser().token);

    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        "Authorization": 'Bearer '+token
    };


    // 서버에서 할 일 목록 (JSON)을 요청해서 받아와야 함
    const API_BASE_URL = TODO_URL;

    /*
        리액트는 부모컴포넌트에서 자식컴포넌트로의 데이터이동이 반대보다 쉽기 때문에
        할 일 데이터는 상위부모컴포넌트에서 처리하는 것이 좋다.
     */
    const [todoList, setTodoList] = useState([]);


    // 데이터 상향식 전달을 위해 부모가 자식에게 함수를 하나 전달
    const addTodo = (todoText) => {

        const makeNewId = () => {
            return todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
        }
        const newTodo = {
            title: todoText
        }
        // console.log('할 일 등록 함수를 todotemplate에서 실행!')

        fetch(API_BASE_URL, {
            method: "POST",
            headers: requestHeader,
            body: JSON.stringify(newTodo)
        })
            .then(res=>{
                if(res.status ===200) return res.json();
                else if(res.status === 401){
                    alert('일반 회원은 일정 등록이 5개로 제한됩니다! 프리미엄회원이 되어보세요!');
                }
            })
            .then(json=>{
                json && setTodoList(json.todos)
            })
    }




    /*
        상태변수의 변경은 오로지 setter를 통해서만 가능~
        상태값이 변경감지가 되면 리액트는 렌더링을 다시 시작
        다만 상태변수가 const형태로 불변성을 띄기 때문에
        기본의 상태값을 변경하는 것은 불가하고
        새로운 상태를 만들어서 바꿔야 합니다.
     */

    // 할 일 삭제 처리 함수
    const removeTodo = id =>{
        //setTodoList(todoList.filter(todo=>todo.id !== id));

        fetch(API_BASE_URL+'/'+id, {
            method: 'DELETE',
            headers: requestHeader
        }).then(res=>res.json())
            .then(json=>{
                setTodoList(json.todos);
            })
    }

    // 할 일 체크 처리 함수
    const checkTodo = (id, done) =>{
        //
        // const copyTodoList = [...todoList];
        // const foundTodo=copyTodoList.find(todo => todo.id === id);
        // foundTodo.done = !foundTodo.done;
        // setTodoList(copyTodoList);

        // setTodoList(todoList.map(todo=>todo.id===id?{...todo, done: !todo.done}: todo));

        fetch(API_BASE_URL, {
            method: "PUT",
            headers: requestHeader,
            body: JSON.stringify({
                id: id,
                done: !done
            })
        }).then(res=>res.json())
            .then(json=>{
                setTodoList(json.todos)
            })
    }

    // 체크가 안된 할일 개수 카운트하기
    const countRestTodo = todoList.filter(todo=>todo.done === false).length;

    // 등급을 올리는 서버 비동기 통신 함수
    const fetchPromote= async () =>{
      const res = await fetch(AUTH_URL+"/promote", {
          method: 'PUT',
          headers: requestHeader
      });
      if(res.status ===200){
          const json = await res.json();

          //토큰 데이터 갱신
          localStorage.setItem(TOKEN, json.token);
          localStorage.setItem(ROLE, json.role);
          setToken(json.token);
      }else{
          alert("로그인이 필요한 서비스입니다")
      }

    };


    // 등급을 상승시키는 함수
    const promote = () =>{
        console.log("등급 올려줘?");
        fetchPromote();
    }

    useEffect(() => {
        fetch(API_BASE_URL,{
            method : "GET",
            headers: requestHeader
        })
            .then(res=> {
                if(res.status===200) return res.json();
                else if(res.status === 403){
                    alert("로그인이 필요한 서비스 입니다.");
                    redirection('/login');
                    return;
                }else{
                    alert('서버가 불안정합니다.');
                    return;
                }
            })
            .then(json=>{
                // console.log(json)
                if(!json) return;
                setTodoList(json.todos);

                // 로딩 완료 처리
                setLoading(false);
            })
    }, []);


    // 로딩이 끝난 후 보여줄 화면
    const loadEndedPage = (
        <div className='TodoTemplate'>
            <TodoHeader count={countRestTodo} onPromote = {promote}/>
            <TodoMain todoList={todoList} onRemove={removeTodo} onCheck={checkTodo}/>
            <TodoInput onAdd={addTodo}/>
        </div>
    );

    // 로딩중일 때 보여줄 페이지
    const loadingPage = (
        <div className='loading'>
        <Spinner animation="border" role="status">
            loading...
        </Spinner>
        </div>
    );

    return (
        <>
            {/*{loadingPage}*/}

            {loading ? loadingPage:loadEndedPage }
        </>
    );
};


export default TodoTemplate;

