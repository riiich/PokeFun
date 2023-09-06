import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <div className="navbar">
            <h>PokéFun</h>
            <Link to="/">Home</Link>
            <Link to="directory">Directory</Link>
        </div>
    );
}