import { useEffect, useState } from "react";
import axios from "axios";

export const PokemonsSearched = () => {
    const [pokemonDataList, setPokemonDataList] = useState([]);

    // api call to retrieve added pokemons from the database
	const pokemonSearchedAmt = async () => {
		await axios.get('http://localhost:3001/searchPokemon/pokemonList')
		 .then((res) => {
			setPokemonDataList(res.data.pokemonSearchList);
			console.log(pokemonDataList);
			
		  })
		 .catch((err) => {
			console.log(err);
		 })
	};

    useEffect(() => {
        pokemonSearchedAmt();
    }, []);

    return(
        <div className="popular">   
            <h2>ID </h2>
            <h2>Pokemon </h2>
            <h2>Amount Searched </h2>
            { pokemonDataList.map(pokemon => (
                <>
                    {/* <div className="id"> */}
                        <p className="pokeId">{pokemon.id}</p>
                    {/* </div> */}
                    {/* <div className="pokeName"> */}
                        <p className="pokeName">{pokemon.name}</p>
                    {/* </div> */}
                    {/* <div className="pokeSearch"> */}
                        <p className="searchCount">{pokemon.searchCount}</p>
                    {/* </div> */}
                </>
            )) }
        </div>
    );
}