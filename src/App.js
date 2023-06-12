import Header from './components/Header';
import appCss from './App.module.css';
import PokemonWrapper from './components/pokemonBox/PokemonWrapper';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonInfo from './components/pokemonInfoPage/pokemonInfo';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';

function App() {
	return (
		<div className={appCss.app}>
			<Header />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/pokemon'>
					<Route path='/pokemon' element={<Home />} />
					<Route path=':id' element={<PokemonInfo />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
				{/* TODO: add error page when pokemon not found */}
			</Routes>
		</div>
	);
}

export default App;
