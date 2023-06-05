import React from 'react';
import { Link } from 'react-router-dom';
import infoCss from './pokemonInfo.module.css';

const NavPrevNextPokemon = ({ pokemonList, currentPokemon }) => {
	const next = pokemonList.findIndex((pk) => currentPokemon === pk.name);
	const nextPokemon = pokemonList[next + 1].name;
	const prevPokemon = pokemonList[next - 1].name;
	const arrowLeft = '<<';
	const arrowRight = '>>';

	return (
		<div className={infoCss.pokeNextPrevBar}>
			<Link to={`/pokemon/${prevPokemon}`}>
				{arrowLeft}
				{prevPokemon}
			</Link>

			<Link to={`/pokemon/${nextPokemon}`}>
				{nextPokemon}
				{arrowRight}
			</Link>
		</div>
	);
};

export default NavPrevNextPokemon;
