import register from '../../assets/register.jpg'
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import {TfiTwitter} from 'react-icons/tfi'
import { useState } from 'react';
import { useError } from '../../context/ErrorContext';
import {auth} from '../../firebase/Firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/Firebase';
import {doc,setDoc} from 'firebase/firestore'



const Register = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {getError}=useError();
    const navigate=useNavigate();


    const saveUser=async(currentUser)=>{
        try{
            console.log(currentUser.uid+"cat fish");
            const response=await setDoc(doc(db,"user",currentUser.uid),{
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


    const handleSubmit=async(e)=>{
        e.preventDefault();         
        try{
            const response=await createUserWithEmailAndPassword(auth,email,password);
            await saveUser(response.user);
            navigate('/detail');
        }catch(err){
            console.log(err.message);
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
        <section className="register container-fluid">
            <div className="register-page row">
                <div className="img-container  bg-danger col-3">
                    <img  src={register} alt="register" className='img-fluid' />
                </div>
                <div className="register-input col-7">
                    <div className="input-container">
                        <div className="input-head ">
                            <h3>Sign up to Paradox</h3>
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
                                    value={email} onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 single-input">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" 
                                    placeholder="@333test"
                                    value={password} onChange={(e)=>setPassword(e.target.value)}
                                    />

                                </div>
                                <button className='btn btn-primary register-button'
                                onClick={(e)=>handleSubmit(e)}
                                >
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="navigation  col-2 text-end">
                    <span>Already a member?<Link to="/">Sign In</Link></span>
                </div>
            </div>
        </section>   
     );
}
 
export default Register;