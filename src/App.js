import './App.css';
import TodoTemplate from "./component/todo/TodoTemplate";
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import Join from "./component/user/Join";
import {Route, Routes} from "react-router-dom";
import Login from "./component/user/Login";

// 부트 스트랩 로딩
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
        <Header />
          <Routes>
              <Route path='/' element={ <TodoTemplate/>}/>
              <Route path='/join' element={<Join/>}/>
              <Route path='/login' element={<Login/>}/>
          </Routes>
        <Footer/>
      </>
    );
}

export default App;