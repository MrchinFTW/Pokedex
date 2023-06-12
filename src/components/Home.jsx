import React from 'react';
import SearchBar from './SearchBar';
import PokemonWrapper from './pokemonBox/PokemonWrapper';
const Home = () => {
	return (
		<div>
			<SearchBar />
			<PokemonWrapper />
		</div>
	);
};

export default Home;
