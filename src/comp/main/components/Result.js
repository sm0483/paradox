import profile from '../../../assets/pr.png'

const Result = ({result}) => {
    if(result.length!==0){
        return(
            result.map((data)=>{
                const {name,photoURL,uid}=data;
                return ( 
                    <div className="single-contact" key={uid}>
                        <div className="image-conatiner">
                            <img src={photoURL ? photoURL :profile} alt="user face" />
                        </div>
                        <div className="text-detail">
                            <h3 className="name">
                                {name}
                            </h3>
                            <h4 className="last-message">
                                Search result
                            </h4>
                        </div>
                    </div>
                );
            })
        )
    }
}
 
export default Result;