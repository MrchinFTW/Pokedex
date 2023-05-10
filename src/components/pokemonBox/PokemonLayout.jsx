import css from './Pokemon.module.css';
import React from 'react';
const PokemonLayout = ({ pk }) => {
	// if (pk.id === 1) {
	// 	console.log(pk);
	// }

	//TODO: set a "setColor" function that return the correct css class for the givin color.
	//TODO: add image and shape it.

	return (
		<div className={css.pokeCell}>
			<div># {pk.id}</div>
			<img src={pk.sprites.front_default} alt='' />
			<div>{pk.name}</div>
			{pk.types.map((type, index) => {
				return <div key={index}>{type.type.name}</div>; //className={setColor(type.type.name)}
			})}
		</div>
	);
};

export default PokemonLayout;
