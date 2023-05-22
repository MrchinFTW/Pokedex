import wrapper from './Pokemon.module.css';
import PokemonLayout from './PokemonLayout';
import { usePokemon } from '../../Hooks/usePokemon';
import React from 'react';

const PokemonWrapper = () => {
	const { pokemon } = usePokemon();
	if (!pokemon) {
		return <div>loading...!</div>;
	}
	return (
		<>
			<div className={wrapper.pokeWrapper}>
				{pokemon.map((pk, index) => {
					return <PokemonLayout pk={pk} key={index} />;
				})}
			</div>
		</>
	);
};

export default PokemonWrapper;
