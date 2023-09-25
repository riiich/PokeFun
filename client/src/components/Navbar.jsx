import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <div className="navbar">
            <h>PokéFun</h>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/directory">Directory</Link>
            <Link to="/pokemonSearched">🏆 Searched Pokemons</Link>
            {/* <Link to="/everything">All Pokemons</Link> */}
        </div>
    );
}