import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContaxtProvider } from './Hooks/usePokemon';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<PokemonContaxtProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PokemonContaxtProvider>
	</React.StrictMode>
);
