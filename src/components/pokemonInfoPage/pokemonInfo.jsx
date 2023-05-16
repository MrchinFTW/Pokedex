import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../../Hooks/usePokemon';
const PokemonInfo = ({ pk }) => {
	const { pokemon, loading, error } = usePokemon();
	const { id } = useParams();

	const pokemonFullInfoObj = pokemon.find((pk) => pk.name === id);
	console.log(pokemonFullInfoObj);

	if (loading) {
		return <div>loading pokemon page</div>;
	}
	return (
		<>
			<img
				src={pokemonFullInfoObj.sprites.other['official-artwork']['front_default']}
				alt={pokemonFullInfoObj.sprites.front_default}
			/>
		</>
	);
};

export default PokemonInfo;
