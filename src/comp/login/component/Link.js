import { Link } from "react-router-dom";
const NavLink = () => {
    return ( 
        <div className="navigation  col-2 text-end">
            <span>Not a member?<Link to="/register">Sign up</Link></span>
        </div>
    );
}
 
export default NavLink;