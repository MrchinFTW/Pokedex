import React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { usePokemon } from '../../Hooks/usePokemon';
import infoCss from './pokemonInfo.module.css';
import PokemonData from './pokemonData';
import PokeomnTraining from './pokemonTraining';
import PokeomnBaseStats from './pokemonBaseStats';
import NavPrevNextPokemon from './NavPrevNextPokemon';
import EvolutionChart from './EvolutionChart';
import DmgChart from './DmgChart';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PokemonInfo = () => {
	const { pokemon, loading, error } = usePokemon();
	const { id } = useParams();
	const pokemonFullInfoObj = pokemon.find((pk) => pk.name === id);
	// console.log(pokemonFullInfoObj);
	// const loading = true;
	// let error, type, color, pokemon, pokemonFullInfoObj;

	if (error) {
		return <>error: {error}</>;
	}

	if (loading) {
		let temp = window.innerHeight;
		temp -= 160;
		return (
			<div style={{ margin: '13px 50px' }}>
				<Skeleton height={'60px'} />
				<div className={infoCss.skeletonFirst}>
					<div className={infoCss.skeletonSec}>
						<Skeleton height={temp} />
					</div>
					<div className={infoCss.skeletonSec}>
						<Skeleton height={temp} />
					</div>
				</div>
			</div>
		);
	}

	if (!pokemonFullInfoObj) {
		let { pathname } = useLocation();
		const falseName = pathname.slice(9);
		return <Navigate to={'/error'} state={`no pokemon found with the name ${falseName}`} />;
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
			<div className={infoCss.evolutionChartSection}>
				<h1>Evolution Chart</h1>
				<EvolutionChart pokemonList={pokemon} currentPokemon={pokemonFullInfoObj} />
			</div>
			<DmgChart typesList={pokemonFullInfoObj.types} />
		</>
	);
};

export default PokemonInfo;
