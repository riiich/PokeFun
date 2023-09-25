import { useState, useEffect } from "react";
import axios from "axios";

export const AllPokemon = ({ pokeSearch }) => {
    const [allPokemon, setAllPokemon] = useState([]);

    const getAllPokemons = async () => {
        await axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000000")
        .then((res) => {
            setAllPokemon(res.data.results);
        })
        .catch(err => {
            console.error(err);
        })
    } 

    useEffect(() => {
        getAllPokemons();
    }, [allPokemon]);

    return(
        <div>
            {allPokemon ? allPokemon.filter((item) => item.name.includes(pokeSearch)).map((pokeName, i) => <p key={i}>{pokeName.name}</p> ): "F"}
        </div>
    );
}