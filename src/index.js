import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PokemonContaxtProvider } from './Hooks/usePokemon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<PokemonContaxtProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PokemonContaxtProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
