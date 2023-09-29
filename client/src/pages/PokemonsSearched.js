import { useEffect, useState } from "react";
import axios from "axios";

export const PokemonsSearched = () => {
    const [pokemonDataList, setPokemonDataList] = useState([]);
    const [popularName, setPopularName] = useState("");
    const [popularImg, setPopularImg] = useState("");

    // axios.defaults.withCredentials = false;

    // api call to retrieve added pokemons from the database
	const pokemonSearchedAmt = async () => {
        // NOT FETCHING DATA BECAUSE WE ARE TRYING TO FETCH FROM AN ENDPOINT ON LOCALHOST
		await axios
            // .get('https://poke-fun-server.vercel.app/searchPokemon/PokemonList')
            .get('http://localhost:3001/searchPokemon/pokemonList')
		    .then((res) => {
                getAllData(res.data.pokemonSearchList);
		    })
		    .catch((err) => {
			    console.log(err);
		    })
	};

    // going through each element and adding it into the pokemonDataList state
    const getAllData = (response) => {
        response.map((item) => {
            setPokemonDataList((single) => {
                single = [...single, item];
                return single;
            });
        });
    };

    useEffect(() => {
        pokemonSearchedAmt();

        pokemonDataList
            .filter((pokemon, i) => i === 0 )
            .map((item) => {
                setPopularName(item.name); 
                setPopularImg(item.image);
            }); 
    }, [popularName]);

    return(
        <>
            <img src={require("../images/pokeballs.gif")} alt="pokeballGif" />

            <div>
                {/* {popularImg ?? <img src={popularImg} alt="pokemon" width="100" height="100" /> } */}
                {popularName.length > 0 ?? <h1>{popularName} is the most searched Pokemon!</h1>}
            </div>
            
            <div className="popular">   
                {/* <h2 className="pokeId">ID </h2> */}
                <h1 className="pokeName">Pokemon </h1>
                <h1 className="pokeSearched">Amount Searched </h1>

                { pokemonDataList.map((pokemon, i) => (
                    <>
                        
                        <h2><code className="pokeName">{i === 0 ? <span>🏆</span> : ""}{i+1}. {pokemon.name}</code></h2>
                        <h2><code className="pokeSearched">{pokemon.searchCount}</code></h2>
                        {/* <p>{pokemon.image}</p> */}
                    </>
                )) }
            </div>
        </>
        
    );
}