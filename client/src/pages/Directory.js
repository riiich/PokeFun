import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { PokemonInfo } from "../components/PokemonInfo";
import { Pagination } from "../components/Pagination";
import { SpinnerDotted } from "spinners-react";

const base_url = "https://pokeapi.co/api/v2";

export const Directory = () => {
	const [currUrl, setCurrUrl] = useState(`${base_url}`);
	const [nextUrl, setNextUrl] = useState(null);
	const [prevUrl, setPrevUrl] = useState(null);
	const [allPokemon, setAllPokemon] = useState([]); // holds all the pokemon
	const [loading, setLoading] = useState(true);
	const [pokemonDetails, setPokemonDetails] = useState(); // holds information of one pokemon

	const getAllPokemon = async () => {
		let cancel;

		setLoading(true);

		await axios
			.get(`${currUrl}/pokemon`, {
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((res) => {
				setLoading(false);
				getPokemon(res.data.results);
				setPrevUrl(res.data.previous);
				setNextUrl(res.data.next);
			})
			.catch((err) => {
				console.log(err);
			});

		return () => cancel();
	};

	// goes through each pokemon url
	const getPokemon = async (response) => {
		response.map(async (item, i) => {
			await axios.get(item.url).then((res) => {
				setAllPokemon((state) => {
					state = [...state, res.data]; // save all the elements in the existing array and add in the new data
					state.sort((a, b) => (a.id > b.id ? 1 : -1));
					return state; // have to return since the state is not iterable
				});
			});
		});
	};

	// pass both the nextPage and prevPage as props into the Pagination component
	const nextPage = () => {
		setAllPokemon([]); // make the array empty so that the next set of pokemons can be added so it can be displayed
		setCurrUrl(nextUrl); // set the current url to the next url to get the next set of new pokemons
	};

	const prevPage = () => {
		setLoading(true);
		setAllPokemon([]);
		
		setCurrUrl(prevUrl);
		if(prevUrl === null){
			alert("You are currently at the first page!");
		}
	};

	useEffect(() => {
		getAllPokemon();
	}, [currUrl]);

	if (loading) {
		return <SpinnerDotted color={"rgb(3, 115, 252)"} thickness={"200"} size={70} />;
	}

	return (
		<div className="directory">
			<div className="directory-title">
				<img src={require("../images/pokedex.gif")} alt="pokedex" width="150" height="100" />
				<h1 >Pokémon Directory</h1>
			</div>
			
			<div className="content">
				{loading ? <SpinnerDotted color={"rgb(3, 115, 252)"} thickness={"200"} size={70} /> : ""}

				<div className="left-side">
					<Card
						pokemonList={allPokemon}
						retrievePokemon={(onePokemon) => {
							setPokemonDetails(onePokemon);
						}}
					/>
				</div>
				
				{/* show info of specific pokemon that is selected */}
				<div className="right-side">
					{ pokemonDetails ? <PokemonInfo pokeDetails={pokemonDetails} /> : <h1>Select a Pokémon to view some details!</h1>}
				</div>
			</div>
			<Pagination nextUrl={nextUrl} prevUrl={prevUrl} nextPage={nextPage} prevPage={prevPage} />
		</div>
	);
};
