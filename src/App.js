import React from 'react';
import Header from './components/Header';
import appCss from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import PokemonInfo from './components/pokemonInfoPage/pokemonInfo';
import ErrorPage from './components/error/ErrorPage';
import Home from './components/Home';
import About from './components/about/About';

function App() {
	return (
		<div className={appCss.app}>
			<Header />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/pokemon'>
					<Route path='/pokemon' element={<Home />} />
					<Route path=':id' element={<PokemonInfo />} />
					<Route path='*' element={<ErrorPage />} />
				</Route>
				<Route path='/about' element={<About />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</div>
	);
}

export default App;
