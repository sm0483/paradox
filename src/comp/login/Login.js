import Head from './component/Head';
import Oauth2 from './component/LoginTwo';
import EmailLogin from './component/EmailLogin';
import NavLink from './component/Link';


const Login = () => {


    return ( 
        <section className="login container-fluid">
            <div className="login-page row">
                <Head/>
                <div className="login-input col-7">
                    <div className="input-container">
                    <Oauth2/>
                        <div className="underline text-center"></div>
                        <EmailLogin/>
                    </div>
                </div>
                <NavLink/>
            </div>
        </section>   
     );
}
 
export default Login;