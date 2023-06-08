import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../../Hooks/usePokemon';
import infoCss from './pokemonInfo.module.css';
import PokemonData from './pokemonData';
import PokeomnTraining from './pokemonTraining';
import PokeomnBaseStats from './pokemonBaseStats';
import NavPrevNextPokemon from './NavPrevNextPokemon';
import EvolutionChart from './EvolutionChart';

const PokemonInfo = () => {
	const { pokemon, loading, error } = usePokemon();
	const { id } = useParams();
	const pokemonFullInfoObj = pokemon.find((pk) => pk.name === id);
	// console.log(pokemonFullInfoObj);

	if (error) {
		return <>error: {error}</>;
	}

	if (loading) {
		return <div>loading pokemon page</div>;
	}

	return (
		<>
			<NavPrevNextPokemon currentPokemon={pokemonFullInfoObj.name} pokemonList={pokemon} />
			<div className={infoCss.centerClass}>
				<div className={infoCss.nameDiv}>{pokemonFullInfoObj.name}</div>
			</div>
			<section className={infoCss.firstInfoSection}>
				<div className={infoCss.imgDivWrapper}>
					<img
						className={infoCss.imgDiv}
						src={pokemonFullInfoObj.sprites.other['official-artwork']['front_default']}
						alt={pokemonFullInfoObj.sprites.front_default}
					/>
				</div>
				<PokemonData pokemonFullInfoObj={pokemonFullInfoObj} />
				<PokeomnTraining pokemonFullInfoObj={pokemonFullInfoObj} />
				<PokeomnBaseStats pokemonFullInfoObj={pokemonFullInfoObj} />
			</section>
			<EvolutionChart pokemonList={pokemon} currentPokemon={pokemonFullInfoObj} />
		</>
	);
};

export default PokemonInfo;
