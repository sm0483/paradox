import { useError } from "../../context/ErrorContext";


const Error = () => {
    const {message}=useError();
    return ( 
        <section className="error">
            <h1>{message}</h1>
        </section>
     );
}
 
export default Error;