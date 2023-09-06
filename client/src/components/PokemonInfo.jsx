import { useState } from "react";

const hectogramToLb = 0.220462;
const decimeterToMeter = 0.1;
const pokemonTypes = [];

export const PokemonInfo = ({ pokeDetails }) => {
    return(
        <div className="show-more">
            { pokeDetails 
                ? 
                <>
                    <h1>{ pokeDetails.name.charAt(0).toUpperCase() + pokeDetails.name.slice(1) }</h1> 
                    <img 
                        src={pokeDetails.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default} 
                        alt={pokeDetails.name} width="300" height="300" 
                    />
                    <div className="showMorePokemon">
                        <h3><code>Skills: </code></h3>
                        { pokeDetails.abilities.map((skill, i) => (
                            <p>{i+1}. {skill.ability.name}</p>
                        )) }
                        <h3><code>Height: </code></h3><p>{ (pokeDetails.height * decimeterToMeter).toFixed(2) } m</p>
                        <h3><code>Weight: </code></h3><p>{ (pokeDetails.weight * hectogramToLb).toFixed(2) } lbs</p>
                        <h3><code>Type: </code></h3>{ pokeDetails.types.map((type, i) => (
                            <p>{i+1}. {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>
                        )) }
                        <div className="base-stats">
                            <h3>
                                <code>Base Stats: </code>
                            </h3>
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