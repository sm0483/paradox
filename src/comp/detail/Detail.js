import detail from '../../assets/login.jpg'
import { Link } from 'react-router-dom';
const Detail = () => {
    return ( 
        <section className="detail container-fluid">
            <div className="detail-page row">
                <div className="img-container  bg-danger col-3">
                    <img  src={detail} alt="detail" className='img-fluid' />
                </div>
                <div className="detail-input col-7">
                    <div className="input-container">
                        <div className="input-head ">
                            <h3>Upload Details!</h3>
                        </div>
                        <div className="underline text-center"></div>
                        <div className="cred-container">
                            <form className='form-control'>
                           
                                <div className="mb-3 single-input">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>

                                <div className="mb-3 single-input">
                                    <label htmlFor="file" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="file" />
                                </div>

                                <div className=" mb-3 single-input img-progress">
                                        <progress value={20} max="100"></progress>
                                </div>
                                <div className="btn-container">
                                    <button className='btn btn-primary detail-button '>
                                        Save
                                    </button>
                                    <button className='btn btn-primary detail-button'>
                                        Skip
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>   
     );
}
 
export default Detail;