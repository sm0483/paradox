import reset from '../../assets/login.jpg'
import { Link } from 'react-router-dom';
import ErrorMessage from '../error-message/ErrorMessage'

const Reset = () => {
    return ( 
        <section className="reset container-fluid">
            <div className="reset-page row">
                <ErrorMessage/>
                <div className="img-container  bg-danger col-3">
                    <img  src={reset} alt="reset" className='img-fluid' />
                </div>
                <div className="reset-input col-7">
                    <div className="input-container">
                        <div className="input-head ">
                            <h3>Forgot password</h3>
                            <div className="para-container">
                                <p>
                                Enter the email address you used when you joined and we’ll 
                                send you instructions to reset your password.
                                For security reasons, we do 
                                not store your password.
                                So rest assured that we will never
                                send your password via email.
                                </p>
                            </div>
                        </div>
                        <div className="cred-container">
                            <form className='form-control'>
                                <div className="mb-3 single-input">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" 
                                    placeholder="name@example.com"/>
                                </div>
                                <button className='btn btn-primary reset-button'>
                                    Send Reset Instruction
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
 
export default Reset;