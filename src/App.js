import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Login from './comp/login/Login'
import Register from './comp/register/Register'
import Error from './comp/error/Error'
import Main from './comp/main/Main'
import Detail from './comp/detail/Detail'
import Reset from './comp/reset/Reset'
import NotFound from './comp/notfound/NotFound'




function App() {
  return (
    <div className="spa">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/error' element={<Error/>}/>
          <Route path='/home' element={<Main/>}/>
          <Route path='/detail' element={<Detail/>}/>
          <Route path='/reset' element={<Reset/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
