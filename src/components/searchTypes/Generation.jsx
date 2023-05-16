import React, { useEffect, useState } from 'react';
import SearchCss from './css/Search.module.css';
import { usePokemon } from '../../Hooks/usePokemon';

async function fetchGenerationById(index) {
	const url = `https://pokeapi.co/api/v2/generation/${index}/`;
	const response = await fetch(url);
	let data = await response.json();
	const genRespone = await fetch(data.main_region.url);
	data = await genRespone.json();
	const regionRes = await fetch(data.pokedexes[0].url);
	data = await regionRes.json();
	return data;
}

async function pokemonGenerations() {
	let genArr = [];
	const result = await fetch('https://pokeapi.co/api/v2/generation');
	let data = await result.json();
	data.results.forEach((res) => {
		genArr.push(res.name);
	});
	return genArr;
}

const Generation = ({ active }) => {
	const [genArr, setGenArr] = useState([]);
	const { findPokemon } = usePokemon();
	useEffect(() => {
		pokemonGenerations().then((data) => setGenArr(data));
	}, []);
	const mainDivClass = active ? `${SearchCss.color} ${SearchCss.hidden}` : `${SearchCss.color}`;

	return (
		<div className={mainDivClass}>
			<ul>
				{genArr.map((gen, index) => {
					return (
						<li
							key={index}
							onClick={async () => {
								const pokemonByGen = await fetchGenerationById(index + 1);
								// console.log({
								// 	pokemonList: pokemonByGen.pokemon_entries,
								// 	type: 'gen',
								// 	typeName: pokemonByGen.name,
								// 	genIndex: index + 1,
								// });
								findPokemon({
									pokemonList: pokemonByGen.pokemon_entries,
									type: 'gen',
									typeName: pokemonByGen.name,
									genIndex: index + 1,
								});
							}}
						>
							{gen}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Generation;
