import React from 'react';
import { Link } from 'react-router-dom';
import infoCss from './pokemonInfo.module.css';

const NavPrevNextPokemon = ({ pokemonList, currentPokemon }) => {
	const currentPokemonIndex = pokemonList.findIndex((pk) => currentPokemon === pk.name);
	let prevPokemon = null;
	let nextPokemon = null;
	let pokeBarCss = infoCss.pokeNextPrevBar;
	if (currentPokemonIndex !== 0) {
		prevPokemon = pokemonList[currentPokemonIndex - 1].name;
	} else {
		pokeBarCss = infoCss.pokeNextBar;
	}
	if (currentPokemonIndex !== pokemonList.length - 1) {
		nextPokemon = pokemonList[currentPokemonIndex + 1].name;
	}
	const arrowLeft = '<<';
	const arrowRight = '>>';

	return (
		<div className={pokeBarCss}>
			{prevPokemon ? (
				<Link to={`/pokemon/${prevPokemon}`}>
					{arrowLeft}
					{prevPokemon}
				</Link>
			) : (
				<></>
			)}

			{nextPokemon ? (
				<Link to={`/pokemon/${nextPokemon}`}>
					{nextPokemon}
					{arrowRight}
				</Link>
			) : (
				<></>
			)}
		</div>
	);
};

export default NavPrevNextPokemon;
