import React from 'react';
import { useState, useEffect } from 'react';

export function useEvolutionChart(url) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		const getPokemonChart = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Request failed');
				}
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		getPokemonChart();
	}, [url]);

	return { data, loading, error };
}
