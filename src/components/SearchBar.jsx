import React from 'react';
import { useState, useEffect } from 'react';
import { usePokemon } from '../Hooks/usePokemon';
import searchCss from './SearchBarCss.module.css';
//meterial ui imports select item
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//meterial ui imports text field
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
	if (index === 0) {
		return [];
	}
	const url = `https://pokeapi.co/api/v2/generation/${index}/`;
	const response = await fetch(url);
	let data = await response.json();
	// const genRespone = await fetch(data.main_region.url);
	// data = await genRespone.json();
	// const regionRes = await fetch(data.pokedexes[0].url);
	// data = await regionRes.json();
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
	const [selectedColor, setSelectedColor] = useState(-1);
	const [selectedType, setSelectedType] = useState(-1);
	const [selectedGen, setSelectedGen] = useState(-1);
	const { findPokemon, findPokemonByName } = usePokemon();

	const changeHandler = async (e) => {
		let index;
		switch (e.target.name) {
			case 'gen':
				setSelectedGen(e.target.value);
				index = genArr.findIndex((gen) => gen === e.target.value);
				const pokeArr = await fetchGenerationById(index + 1);
				findPokemon({
					pokemonList: pokeArr.pokemon_species,
					type: 'gen',
					typeName: e.target.value,
				});
				break;
			case 'type':
				setSelectedType(e.target.value);
				index = typeArr.findIndex((type) => type.name === e.target.value);
				if (e.target.value === -1) {
					findPokemon({
						pokemonList: [],
						type: 'type',
						typeName: e.target.value,
					});
				} else {
					findPokemon({
						pokemonList: typeArr[index].pokemon,
						type: 'type',
						typeName: e.target.value,
					});
				}
				break;

			case 'color':
				setSelectedColor(e.target.value);
				index = colorsArr.findIndex((color) => color.name === e.target.value);
				if (e.target.value === -1) {
					findPokemon({
						pokemonList: [],
						type: 'color',
						typeName: e.target.value,
					});
				} else {
					findPokemon({
						pokemonList: colorsArr[index].pokemon_species,
						type: 'color',
						typeName: e.target.value,
					});
				}
				break;

			case 'text':
				findPokemonByName(e.target.value);
				break;

			default:
				console.log('no need for default');
				break;
		}
	};

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

	const capFirstLetter = (str) => {
		const firstLetter = str.charAt(0).toUpperCase();
		const restOfStr = str.slice(1);
		return firstLetter + restOfStr;
	};

	return (
		<div className={searchCss.searchBar}>
			<p>Pick your favorite Pokémon</p>
			<div className={searchCss.searchSelectorsWrapper}>
				{/* material ui select for gen selet */}
				<FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id='demo-simple-select-filled-label'>Generation</InputLabel>
					<Select
						labelId='demo-simple-select-filled-label'
						id='demo-simple-select-filled'
						label='Gen'
						name='gen'
						value={selectedGen}
						onChange={(e) => {
							changeHandler(e);
						}}
					>
						<MenuItem value={-1}>
							<em>All</em>
						</MenuItem>
						{genArr.map((gen, index) => {
							const parts = gen.split('-');
							const generation = parts[1].toUpperCase();
							const genName = `GEN-${generation}`;
							return (
								<MenuItem value={gen} key={index}>
									{genName}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				{/* material ui select for type selet */}

				<FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id='demo-simple-select-filled-label'>Type</InputLabel>
					<Select
						labelId='demo-simple-select-filled-label'
						id='demo-simple-select-filled'
						label='Type'
						name='type'
						value={selectedType}
						onChange={(e) => {
							changeHandler(e);
						}}
					>
						<MenuItem value={-1}>
							<em>All</em>
						</MenuItem>
						{typeArr.map((type, index) => {
							const typeName = capFirstLetter(type.name);
							if (type.pokemon.length >= 1) {
								return (
									<MenuItem value={type.name} key={index}>
										{typeName}
									</MenuItem>
								);
							}
						})}
					</Select>
				</FormControl>

				{/* material ui select for color selet */}

				<FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id='demo-simple-select-filled-label'>Color</InputLabel>
					<Select
						labelId='demo-simple-select-filled-label'
						id='demo-simple-select-filled'
						label='Color'
						name='color'
						value={selectedColor}
						onChange={(e) => {
							changeHandler(e);
						}}
					>
						<MenuItem value={-1}>
							<em>All</em>
						</MenuItem>
						{colorsArr.map((color, index) => {
							const colorName = capFirstLetter(color.name);
							return (
								<MenuItem value={color.name} key={index}>
									{colorName}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<Box
					component='form'
					sx={{
						'& > :not(style)': { m: 1, width: '25ch' },
					}}
					autoComplete='off'
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<TextField
						id='filled-basic'
						label='Enter Name'
						variant='filled'
						name='text'
						onChange={(e) => {
							changeHandler(e);
						}}
					/>
				</Box>
			</div>

			{/* TODO: add a clear button */}
		</div>
	);
};

export default SearchBar;
