import login from '../../../assets/login.jpg'

const Head = () => {
    return ( 
        <div className="img-container  bg-danger col-3">
            <img  src={login} alt="login" className='img-fluid' />
        </div>
    );
}
 
export default Head;