import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <div className="navbar">
                <Link to="/">
                <div className="navLogo">
                    <img src={require("../images/navpokeball.gif")} alt="pokeball" width="50" height="50" />
                    <h>PokéFun</h>
                </div>
                </Link>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/directory">Directory</Link>
                <Link to="/pokemonSearched">🏆 Searched Pokemons</Link>
                {/* <Link to="/everything">All Pokemons</Link> */}
        </div>
    );
}