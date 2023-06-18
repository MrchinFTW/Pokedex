import React from 'react';
import infoCss from './pokemonInfo.module.css';
import { useEvolutionChart } from '../../Hooks/useEvolutionChart';
import PokemonLayout from '../pokemonBox/PokemonLayout';

const EvolutionChart = ({ pokemonList, currentPokemon }) => {
	const { data, loading, error } = useEvolutionChart(currentPokemon.evolution_chain.url);
	if (loading) {
		return <div> loading.......</div>;
	}

	if (error) {
		console.warn(error);
		return <h1>Error in evolution_chain</h1>;
	}

	const findPokeObj = (pokemonName) => {
		const pokemonObj = pokemonList.find((pokemon) => pokemon.name === pokemonName);
		return pokemonObj;
	};

	const findTrigger = (obj) => {
		let trigger, temp;
		let triggerDetails = '';
		trigger = obj.evolution_details[0].trigger.name;
		switch (trigger) {
			case 'level-up':
				temp = obj.evolution_details[0].min_level;
				if (temp === null) {
					triggerDetails = 'Leveling';
				} else {
					triggerDetails = `Level ${obj.evolution_details[0].min_level}`;
				}
				break;
			case 'trade':
				triggerDetails = 'Trade';
				break;
			case 'use-item':
				temp = obj.evolution_details[0].item.name;
				temp = temp.replace(/-/g, ' ');
				triggerDetails = `use ${temp}`;
				break;

			case 'three-critical-hits':
				triggerDetails = `3 crits in one battle`;
				break;

			case 'agile-style-move':
				temp = obj.evolution_details[0].known_move.name;
				temp = temp.replace(/-/g, ' ');
				temp = temp.charAt(0).toUpperCase() + temp.slice(1);
				triggerDetails = `attack using ${temp} in agile style`;
				break;
			case 'strong-style-move':
				temp = obj.evolution_details[0].known_move.name;
				temp = temp.replace(/-/g, ' ');
				temp = temp.charAt(0).toUpperCase() + temp.slice(1);
				triggerDetails = `attack using ${temp} in strong style`;
				break;

			default:
				temp = trigger.replace(/-/g, ' ');
				triggerDetails = trigger;
				break;
		}

		return triggerDetails;
	};
	function renderNestedObject(obj) {
		let pokeObj = findPokeObj(obj.species.name);
		let triggerDetails;

		return (
			<div className={infoCss.evoChartWrapper}>
				<PokemonLayout pk={pokeObj} />
				{obj.evolves_to && obj.evolves_to.length > 0 && <div></div>}
				{obj.evolves_to && obj.evolves_to.length > 0 && (
					<div>
						{obj.evolves_to.map((evolvesObj) => {
							console.log(evolvesObj);
							triggerDetails = findTrigger(evolvesObj);
							return (
								<div key={evolvesObj.name} className={infoCss.evolutionChainBox}>
									<div className={infoCss.evoTriggerWrapper}>
										<div style={{ fontSize: '37px', paddingBottom: '10px' }}>{'\u21A3'}</div>
										<div className={infoCss.evoTriggerDetail}>{triggerDetails}</div>
									</div>
									{renderNestedObject(evolvesObj)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	}

	return <div> {renderNestedObject(data.chain)}</div>;
};

export default EvolutionChart;
