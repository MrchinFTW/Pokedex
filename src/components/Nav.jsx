import navCss from './Nav.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { usePokemon } from '../Hooks/usePokemon';
//meterial ui imports
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//material ui button imports
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
	console.log(index);
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

const Nav = () => {
	const [genArr, setGenArr] = useState([]);
	const [typeArr, setTypeArr] = useState([]);
	const [colorsArr, setColorsArr] = useState([]);
	const [selectedColor, setSelectedColor] = useState(-1);
	const [selectedType, setSelectedType] = useState(-1);
	const [selectedGen, setSelectedGen] = useState(-1);

	const { findPokemon } = usePokemon();

	const changeHandler = async (e) => {
		let index;
		switch (e.target.name) {
			case 'gen':
				setSelectedGen(e.target.value);
				index = genArr.findIndex((gen) => gen === e.target.value);
				console.log(genArr);
				const pokeArr = await fetchGenerationById(index + 1);
				findPokemon({
					pokemonList: pokeArr.pokemon_entries,
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

	return (
		<div className={navCss.nav}>
			<div className={navCss.imageDiv}>
				<img src='pokemon-logo.png' alt='asd' />
			</div>

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
					{genArr.map((gen) => {
						return <MenuItem value={gen}>{gen}</MenuItem>;
					})}
				</Select>
			</FormControl>

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
					{typeArr.map((type) => {
						return <MenuItem value={type.name}>{type.name}</MenuItem>;
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
					{colorsArr.map((color) => {
						return <MenuItem value={color.name}>{color.name}</MenuItem>;
					})}
				</Select>
			</FormControl>

			{/* TODO: add a clear button */}
			{/* <Stack direction='row'>
				<Button color='error' variant='outlined'>
					Outlined
				</Button>
			</Stack> */}
		</div>
	);
};

export default Nav;
