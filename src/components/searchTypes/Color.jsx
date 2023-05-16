import React from 'react';
import { useEffect, useState } from 'react';
import ColorsCss from './css/Colors.module.css';
import SearchCss from './css/Search.module.css';

import { usePokemon } from '../../Hooks/usePokemon';

async function getColors() {
	const colorsUrls = [];
	const res = await fetch('https://pokeapi.co/api/v2/pokemon-color/');
	const data = await res.json();
	data.results.forEach((color) => {
		colorsUrls.push(color.url);
	});
	const promises = colorsUrls.map((url) => fetch(url).then((response) => response.json()));
	const pokeColor = await Promise.all(promises);
	return pokeColor;
}

const Color = ({ active }) => {
	const { findPokemon } = usePokemon();
	const [colors, setColors] = useState([]);
	useEffect(() => {
		getColors().then((data) => setColors(data));
	}, []);

	const mainDivClass = active ? `${SearchCss.color} ${SearchCss.hidden}` : `${SearchCss.color}`;

	return (
		<div className={mainDivClass}>
			<ul>
				{colors.map((color, index) => {
					let classToReturn = ColorsCss[color.name];
					return (
						<li
							key={index}
							className={classToReturn}
							onClick={() => {
								// console.log({
								// 	pokemonList: color.pokemon_species,
								// 	type: 'color',
								// 	typeName: color.name,
								// });
								findPokemon({
									pokemonList: color.pokemon_species,
									type: 'color',
									typeName: color.name,
								});
							}}
						>
							{color.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Color;
