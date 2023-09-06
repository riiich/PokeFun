import { useState } from "react";

export const Card = ({ pokemonList, retrievePokemon }) => {
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    const showInfo = (pokemon) => {
        retrievePokemon(pokemon);
        setShowMoreInfo(!showMoreInfo);
    }

    return(
        <div className="pokemonCards">
            { pokemonList.map((item) => (
                    <div className="singlePokemon" key={item.id}>
                        <p>
                            Pokemon #{item.id}: {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                        </p>
                        <img src={item.sprites.front_default} alt={item.name} width="100" height="100" />

                        <button onClick={() => {showInfo(item)}}>{ !showMoreInfo ? "Show More" : "Show Less" }</button>
                    </div>
                ))
            }
        </div>
    );
}