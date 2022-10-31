import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useError } from '../../../context/ErrorContext';
import { auth } from '../../../firebase/Firebase';

const EmailLogin = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {getError} =useError();

    const signIn=async(e)=>{
        e.preventDefault();         
        try{
            const response=await signInWithEmailAndPassword(auth,email,password);
            console.log(response);
            navigate('/home');
        }catch(err){
            getError(err.message);
            navigate('/error');
        }
    }

    


    return ( 
        <div className="cred-container">
            <form className='form-control'>
                <div className="mb-3 single-input">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" 
                    placeholder="name@example.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3 single-input">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" 
                    placeholder="@333test"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <div id="forget-password" className="form-text">
                        <Link to="/reset">Forget password</Link>
                    </div>

                </div>
                <button className='btn btn-primary login-button'
                onClick={(e)=>signIn(e)}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
 
export default EmailLogin;