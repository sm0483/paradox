import register from '../../assets/register.jpg'
import './register.css'
import { Link } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import {TfiTwitter} from 'react-icons/tfi'
const Register = () => {
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
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" 
                                    placeholder="name@example.com"/>
                                </div>
                                <div className="mb-3 single-input">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" 
                                    placeholder="@333test"/>

                                </div>
                                <button className='btn btn-primary register-button'>
                                    Create new account
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