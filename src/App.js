import Layout from './components/Layout';
import appCss from './App.module.css';
import PokemonWrapper from './components/pokemonBox/PokemonWrapper';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonInfo from './components/pokemonInfoPage/pokemonInfo';
function App() {
	return (
		<div className={appCss.app}>
			<Layout />

			<Routes>
				<Route path='/' element={<PokemonWrapper />} />
				<Route path='/pokemon/:id' element={<PokemonInfo />} />
			</Routes>
		</div>
	);
}

export default App;
