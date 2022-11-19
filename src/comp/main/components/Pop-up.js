
const Pop = ({message,pop,setPop}) => {
    return (
        <div className={`image-pop ${pop===message && "image-pop-up"}`} >
            <img src={message} alt="large" />
            <button onClick={()=>setPop(false)}> <h1>&times;</h1> </button>
       </div>
    );
}
 
export default Pop;