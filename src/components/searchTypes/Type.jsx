import React from 'react';
import { useEffect, useState } from 'react';
import SearchCss from './css/Search.module.css';
import { usePokemon } from '../../Hooks/usePokemon';

async function getTypes() {
	let typesUrl = [];
	const result = await fetch('https://pokeapi.co/api/v2/type');
	let data = await result.json();
	data.results.forEach((dataType) => {
		typesUrl.push(dataType.url);
	});
	const promises = typesUrl.map((url) => fetch(url).then((response) => response.json()));
	const pokeTypes = await Promise.all(promises);
	return pokeTypes;
}

const Type = ({ active }) => {
	const [pokeTypesFetch, setPokeTypesFetch] = useState([]);
	const { findPokemon } = usePokemon();
	useEffect(() => {
		getTypes().then((data) => {
			setPokeTypesFetch(data);
		});
	}, []);

	const mainDivClass = active ? `${SearchCss.color} ${SearchCss.hidden}` : `${SearchCss.color}`;

	return (
		<div className={mainDivClass}>
			<ul>
				{pokeTypesFetch.map((type, index) => {
					if (type.pokemon.length > 1) {
						return (
							<li
								key={index}
								onClick={() => {
									// console.log({ pokemonList: type.pokemon, type: 'type', typeName: type.name });
									findPokemon({ pokemonList: type.pokemon, type: 'type', typeName: type.name });
								}}
							>
								{type.name}
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};

export default Type;
