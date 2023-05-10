import Layout from './components/Layout';
import appCss from './App.module.css';
import PokemonWrapper from './components/pokemonBox/PokemonWrapper';
import React from 'react';
function App() {
	return (
		<div className={appCss.app}>
			<Layout />
			<PokemonWrapper />
		</div>
	);
}

export default App;
