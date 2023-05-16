import SearchCss from './SearchBarCss.module.css';
import { useState, useEffect } from 'react';
import { usePokemon } from '../Hooks/usePokemon';
import React from 'react';

async function getGenerations() {
	let genArr = [];
	const result = await fetch('https://pokeapi.co/api/v2/generation');
	let data = await result.json();
	data.results.forEach((res) => {
		genArr.push(res.name);
	});
	return genArr;
}

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

const SearchBar = () => {
	const [genArr, setGenArr] = useState([]);
	const [typeArr, setTypeArr] = useState([]);
	const [colorsArr, setColorsArr] = useState([]);

	const { findPokemon } = usePokemon();

	//use effect get generations
	useEffect(() => {
		getGenerations().then((data) => {
			return setGenArr(data);
		});
	}, []);
	//use effect get types
	useEffect(() => {
		getTypes().then((data) => {
			return setTypeArr(data);
		});
	}, []);
	//use effect get colors
	useEffect(() => {
		getColors().then((data) => {
			setColorsArr(data);
		});
	}, []);

	return (
		<>
			<div className={SearchCss.SearchNav}>
				<select
					name='generation'
					id=''
					onChange={async (e) => {
						//TODO: add pokeObj the send the correct type and -1 so find function will delete the type from
						//searching array.
						const index = parseInt(
							e.target.options[e.target.selectedIndex].getAttribute('data-index')
						);
						const pokemonByGen = await fetchGenerationById(index + 1);
						findPokemon({
							pokemonList: pokemonByGen.pokemon_entries,
							type: 'gen',
							typeName: pokemonByGen.name,
						});
					}}
				>
					<option data-index='-1'>All</option>
					{genArr.map((gen, index) => {
						return (
							<option value={gen} data-index={index}>
								{gen}
							</option>
						);
					})}
				</select>

				<select
					name='type'
					id=''
					onChange={async (e) => {
						const index = parseInt(
							e.target.options[e.target.selectedIndex].getAttribute('data-index')
						);
						console.log(index);
						findPokemon({
							pokemonList: typeArr[index].pokemon,
							type: 'type',
							typeName: typeArr[index].name,
						});
					}}
				>
					<option data-index='-1'>All</option>
					{typeArr.map((type, index) => {
						if (type.pokemon.length > 1) {
							return (
								<option value={type.name} data-index={index}>
									{type.name}
								</option>
							);
						}
					})}
				</select>

				<select name='color' id=''>
					<option data-index='-1'>All</option>
					{colorsArr.map((color) => {
						return <option value={color.name}>{color.name}</option>;
					})}
				</select>
			</div>
		</>
	);
};

export default SearchBar;
