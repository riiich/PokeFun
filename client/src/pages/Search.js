import { useState, useEffect } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { AllPokemon } from "../components/AllPokemon";

const base_url = "https://pokeapi.co/api/v2/pokemon";

export const Search = () => {
    const [loading, setLoading] = useState(false);
	const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState(null);	// holds the main information of the pokemon
	const [additionalPokeInfo, setAdditionalPokeInfo] = useState(null);		// holds more interesting information (eg. capture rate...)
    const [clicked, setClicked] = useState(false);
	const [pokemonImg, setPokemonImg] = useState(null);
	const [allPokemons, setAllPokemons] = useState([]);

    const buttonClick = async (e) => {
		try{
			if (pokemonName === "") {
				alert("There is no Pokémon to look up!");
				return;
			}

			clicked ? setClicked(false) : setClicked(true);
			await pokeDetails();
			await pokeSpecies();
			await addPokemon();
			e.target.value = "";
		}
		catch(error){
			console.log(error);
		}
	};

	// get all the existing pokemon and put it into an array to pass back to the server to do checking
	const getAllPokemons = async () => {
		await axios
			.get(`${base_url}?offset=0&limit=100000000`)
			.then((res) => {
				addToPokemonList(res.data.results);
			})
			.catch((err) => {
				console.log(err);
			})
	};

	// the response of the above function returns an array of objects of the pokemon and its url, so
	//		it's necessary to go through the array and only retrieve the name since we need it for 
	//		server processing, not the object of the pokemon name and its url
	const addToPokemonList = (response) => {
		response.map((item) => {
			// need to use an updater function to update the state and get new pokemon names
			setAllPokemons((single) => {
				single = [...single, item.name];
				return single;
			});
		});
	};

	// FOR SOME REASON, FETCHING NEEDS TO BE DONE TWICE BEFORE WE ARE ABLE TO GET SOME DATA SUCH AS SPRITE
    const pokeDetails = async () => {
		try{
			setLoading(true);

			await axios
				.get(`${base_url}/${pokemonName}`)
				.then((res) => {
					setPokemon(res.data);
					setLoading(false);
					setPokemonImg(res.data?.sprites.front_default)
				})
				.catch((err) => {
					console.error(err);
				});
		}
		catch(error){
			console.log(error);
		}
	};

 	const pokeSpecies = async () => {
		try{
			await axios
				.get(`${base_url}-species/${pokemonName}`)
		 		.then((res) => {
					setAdditionalPokeInfo(res.data);
				})	
				.catch((err) => {
					console.error(err);
				})
		}
		catch(error){
			console.log(error);
		}
	};
	
	// api call to add pokemon into the database
	const addPokemon = async () => {
		try{
			await axios
				.post('http://localhost:3001/searchPokemon/pokemonList', {
					pokemonName: pokemonName,
					pokemonImg: pokemonImg,
					allPokemons: allPokemons,
				})
				.then((res) => {
					console.log(res.data.pokemon);
				})
				.catch((err) => {
					console.log(err);
				})
		}
		catch(error){
			console.log(error);
		}
	};

	useEffect(() => {
		getAllPokemons();
	}, []);

    return( 
        <div className="search-page">
            <div className="search-bar">
				<input
					type="search"
					placeholder="Enter a Pokémon..."
					onChange={ (e) => { setPokemonName(e.target.value.toLowerCase()) } }
				/>
				<button onClick={(e) => {buttonClick(e)}}>Enter</button>

				{pokemonName ? <AllPokemon pokeSearch={pokemonName} /> : ""}
				{loading ? <SpinnerDotted color={"rgb(3, 115, 252)"} thickness={"200"} size={70} /> : ""}
			</div>

			{pokemon ? (
				<>
					<div className="searched-poke-info">
						<img src={ pokemon.sprites.front_default } alt="pokemon" width="250" height="250" />
						<div>
							<h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
							<p>Pokemon #{ pokemon.id }</p>
							<p><code><strong>Base HP: </strong></code>{pokemon.stats[0].base_stat}</p>
							
							<code><strong>Abilities: </strong></code>
							{pokemon.abilities.map((skill, i) => (
								<p key={skill.slot}>{skill.ability.name}</p>
							))}

							<p><code><strong>Capture rate: </strong></code>{ additionalPokeInfo ? additionalPokeInfo.capture_rate : "N/A" }</p>
							<p><code><strong>Prestige: </strong></code>{ additionalPokeInfo ? (additionalPokeInfo.is_legendary ? "Is Legendary" : "Not Legendary") : "N/A"}</p>
							<p><code><strong>Cool Fact: </strong></code>{ additionalPokeInfo ? additionalPokeInfo.flavor_text_entries[1].flavor_text : "N/A" }</p>
							{/* <p><code><strong>: </strong></code>{ additionalPokeInfo }</p> */}
						</div>
						{pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default 
							? <img src={ pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default } alt="pokemon" width="125" height="125" /> 
							: ""
						}
					</div>
				</>
				
			) : (
				<img src={require("../images/whatThatPokemon.png")} alt="pokeball" />
			)}
        </div>
    )
}

/*

try{

}
catch(error){
	console.log(error);
}

*/