import css from './Pokemon.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
const PokemonLayout = ({ pk }) => {
	if (pk.id === 1) {
		console.log(pk.types[0].type.name);
	}

	return (
		<div className={css.pokeCell}>
			<div># {pk.id}</div>
			<Link to={`/pokemon/${pk.name}`}>
				<img src={pk.sprites.front_default} alt='' />
			</Link>
			<div>{pk.name}</div>
			<div className={css.pokeTypesWrapper}>
				{pk.types.map((type, index) => {
					let typeClass = `${css.pokeType} ${css[type.type.name]}`;
					return (
						<div key={index} className={typeClass}>
							{type.type.name}
						</div>
					); //className={setColor(type.type.name)}
				})}
			</div>
		</div>
	);
};

export default PokemonLayout;
