import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../../Hooks/usePokemon';
import infoCss from './pokemonInfo.module.css';
import colorCss from '../pokemonBox/Pokemon.module.css';

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
						<th>{pokeHabitat}</th>
					</tr>

					<tr>
						<td>Hieght:</td>
						<th>{pokemonFullInfoObj.height}</th>
					</tr>

					<tr>
						<td>Weight:</td>
						<th>{pokemonFullInfoObj.weight}</th>
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
			</section>
		</>
	);
};

export default PokemonInfo;
