import login from '../../assets/login.jpg'
import { Link } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import {TfiTwitter} from 'react-icons/tfi'
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setDoc,doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { useError } from '../../context/ErrorContext';


const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {getError} =useError();
    

    const checkTheUser=async(currentUser)=>{
        try{
            const response=await getDoc(doc(db,"user",currentUser.uid));
            if(response.exists()){
                return true;
            }
            return false;
        }catch(err){
            getError(err.message);
            navigate('/error');
        }
    }

    const saveUser=async(currentUser)=>{
        try{
            const check=await checkTheUser(currentUser);
            if(check) return;
            console.log(currentUser.uid+"cat fish");
            await setDoc(doc(db,"user",currentUser.uid),{
                uid:currentUser.uid,
                email:currentUser.email,
                name:currentUser.displayName,
                photoURL:currentUser.photoURL
            });
        }catch(err){
            console.log(err.message);
            getError(err.message);
            navigate('/error');
        }
    }


    const signIn=async(e)=>{
        e.preventDefault();         
        try{
            const response=signInWithEmailAndPassword(auth,email,password);
            navigate('/home');
        }catch(err){
            getError(err.message);
            navigate('/error');
        }
    }


    const provider=new GoogleAuthProvider();
    const popupLogin=async()=>{
        try{
            const response=await signInWithPopup(auth,provider);
            await saveUser(response.user);
            console.log(response.user.uid);
            navigate('/home')
        }catch(err){
            console.log(err.message);
            getError(err.message);
            navigate('/error');
        }
    }


    return ( 
        <section className="login container-fluid">
            <div className="login-page row">
                <div className="img-container  bg-danger col-3">
                    <img  src={login} alt="login" className='img-fluid' />
                </div>
                <div className="login-input col-7">
                    <div className="input-container">
                        <div className="input-head ">
                            <h3>Sign in to Paradox</h3>
                            <div className="button-container">
                                <button className="btn btn-google"
                                onClick={popupLogin}
                                >
                                    <span className='btnIcon'><FcGoogle/></span>
                                    <span className='btnText'>Sign in with Google</span>
                                </button>
                                <button className=" btn btn-twitter">
                                    <TfiTwitter/>
                                </button>
                            </div>
                        </div>
                        <div className="underline text-center"></div>
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
                    </div>
                </div>
                <div className="navigation  col-2 text-end">
                    <span>Not a member?<Link to="/register">Sign up</Link></span>
                </div>
            </div>
        </section>   
     );
}
 
export default Login;