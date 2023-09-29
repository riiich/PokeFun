import { useState } from "react";

const hectogramToLb = 0.220462;
const decimeterToMeter = 0.1;

const typeColors = {
    "bug": "#A8B820", 
    "dark": "#A8B820", 
    "electric": "#F8D030", 
    "fairy": "#EE99AC", 
    "fire": "#F08030", 
    "flying": "#A890F0", 
    "ghost": "#705898", 
    "grass": "#78C850", 
    "ground": "#E0C068", 
    "ice": "#98D8D8", 
    "normal": "#A8A878", 
    "poison": "#A040A0", 
    "rock": "#B8A038", 
    "psychic": "#F85888", 
    "water": "#6890F0", 
    "dragon": "#7038F8", 
    "steel": "#B8B8D0"
};

export const PokemonInfo = ({ pokeDetails }) => {
    return(
        <div className="show-more">
            { pokeDetails 
                ? 
                <>
                    <h1>{ pokeDetails.name.charAt(0).toUpperCase() + pokeDetails.name.slice(1) }</h1> 
                    <img
                        src={pokeDetails.sprites.versions["generation-v"]["black-white"].animated.front_default} 
                        // src={pokeDetails.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default} 
                        alt={pokeDetails.name} width="200" height="200" 
                    />
                    <div className="showMorePokemon">
                        <h3><code>Skills: </code></h3>
                        { pokeDetails.abilities.map((skill, i) => (
                            <p>{i+1}. {skill.ability.name}</p>
                        )) }
                        <h3><code>Height: </code></h3><p>{ (pokeDetails.height * decimeterToMeter).toFixed(2) } m</p>
                        <h3><code>Weight: </code></h3><p>{ (pokeDetails.weight * hectogramToLb).toFixed(2) } lbs</p>
                        <h3><code>Type: </code></h3>{ pokeDetails.types.map((type, i) => (
                            <p style={{backgroundColor: `${typeColors[type.type.name]}`, width:"fit-content", 
                                       padding:"0 10px 0 10px", margin:"0 30% 10px 42%", alignItems:"center",
                                       borderRadius:"10px"}}> 
                                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                            </p>
                        )) }
                        <div className="base-stats">
                            <h3><code>Base Stats: </code></h3>
                            <p>{pokeDetails.stats[0].stat.name}: {pokeDetails.stats[0].base_stat}</p>
                            <p>{pokeDetails.stats[1].stat.name}: {pokeDetails.stats[1].base_stat}</p>
                            <p>{pokeDetails.stats[2].stat.name}: {pokeDetails.stats[2].base_stat}</p>
                            <p>{pokeDetails.stats[3].stat.name}: {pokeDetails.stats[3].base_stat}</p>
                            <p>{pokeDetails.stats[4].stat.name}: {pokeDetails.stats[4].base_stat}</p>
                            <p>{pokeDetails.stats[5].stat.name}: {pokeDetails.stats[5].base_stat}</p>
                        </div>
                        
                    </div>
                </>
                : ""    
            }
        </div>
    );
}