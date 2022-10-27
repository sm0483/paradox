import login from '../../assets/login.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import { Link } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import {TfiTwitter} from 'react-icons/tfi'
const Login = () => {
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
                                    placeholder="name@example.com"/>
                                </div>
                                <div className="mb-3 single-input">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" 
                                    placeholder="@333test"/>

                                    <div id="forget-password" className="form-text">
                                        <Link to="/reset">Forget password</Link>
                                    </div>

                                </div>
                                <button className='btn btn-primary login-button'>
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