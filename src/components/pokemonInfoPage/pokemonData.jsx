import React from 'react';
import infoCss from './pokemonInfo.module.css';
import colorCss from '../pokemonBox/Pokemon.module.css';

const PokemonData = ({ pokemonFullInfoObj }) => {
	let habitat;

	if (pokemonFullInfoObj.habitat === null) {
		habitat = 'Unknown';
	} else {
		habitat = pokemonFullInfoObj.habitat.name;
	}
	const pokemonHeight = (pokemonFullInfoObj.height * 0.1).toFixed(1);
	const pokemonWeight = (pokemonFullInfoObj.weight * 0.1).toFixed(1);

	return (
		<div className={infoCss.pokeGeneralWrapper}>
			<h2> pokemon Data</h2>
			<table className={infoCss.pokeGeneralData}>
				<tr>
					<td>National pokedex number </td>
					<th># {pokemonFullInfoObj.id}</th>
				</tr>

				<tr>
					<td>Types:</td>
					<th>
						<div className={infoCss.dexNum}>
							{pokemonFullInfoObj.types.map((type) => {
								return (
									<div className={`${colorCss.pokeType} ${colorCss[type.type.name]}`}>
										{type.type.name}
									</div>
								);
							})}
						</div>
					</th>
				</tr>

				<tr>
					<td>Habitat:</td>
					<th>{habitat}</th>
				</tr>

				<tr>
					<td>Hieght:</td>
					<th>{`${pokemonHeight} m`}</th>
				</tr>

				<tr>
					<td>Weight:</td>
					<th>{`${pokemonWeight} kg`}</th>
				</tr>

				<tr>
					<td>Local pokedex number:</td>
					<th>
						{pokemonFullInfoObj.pokedex_numbers.map((pokedex) => {
							const dexName = pokedex.pokedex.name;
							const dexNameNoMdlScor = dexName.replace(/-/g, ' ');
							const dexNum = pokedex.entry_number;
							let dexNumWithZero = 0;
							if (dexNum - 10 < 0) {
								dexNumWithZero = `000${dexNum}`;
							} else if (dexNum - 100 < 0) {
								dexNumWithZero = `00${dexNum}`;
							} else if (dexNum - 1000 < 0) {
								dexNumWithZero = `0${dexNum}`;
							} else {
								dexNumWithZero = `${dexNum}`;
							}
							return (
								<div className={infoCss.dexNum}>
									{<div># {dexNumWithZero} </div>}
									{<div className={infoCss.pokedexName}> {dexNameNoMdlScor}</div>}
								</div>
							);
						})}
					</th>
				</tr>
			</table>
		</div>
	);
};

export default PokemonData;
