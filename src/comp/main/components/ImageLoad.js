import { enableIndexedDbPersistence } from "firebase/firestore";

const ImageLoad = ({value}) => {
    console.log(value);
    return ( 
        <div className="message sender">
            <div className="message-image">
                <progress value={value} max={100} />
            </div> 
        </div>
    );
}
 
export default ImageLoad;