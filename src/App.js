import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/comp/login/login.css'
import '../src/comp/register/register.css'
import '../src/comp/reset/reset.css'
import './index.css'
import '../src/comp/login/login.css'
import '../src/comp/detail/detail.css'
import '../src/comp/main/main.css'
import 'bootstrap/dist/js/bootstrap.js';




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
import { useAuth } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext';

const RequireAuth=({children})=>{
    const {currentUser}=useAuth();
    if(!currentUser){
      return <Navigate to='/' />
    }

    return children;

}


function App() {
  return (
    <div className="spa">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/error' element={<Error/>}/>
          <Route path='/home' element={
            <RequireAuth>
              <ChatProvider>
                <Main/>
              </ChatProvider>
            </RequireAuth>
          }/>
          <Route path='/detail' element={
            <RequireAuth>
              <Detail/>
            </RequireAuth>
          }/>
          <Route path='/reset' element={<Reset/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
