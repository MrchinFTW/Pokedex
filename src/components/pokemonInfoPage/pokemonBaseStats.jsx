import React from 'react';
import infoCss from './pokemonInfo.module.css';

const PokeomnBaseStats = ({ pokemonFullInfoObj }) => {
	const maxNum = 300;

	// const hpPresent = (hp * 100) / maxNum;
	//TODO: need to change the stat bar with the value of the base stat in the pokeObj.
	//      need to change the color & width. smaller then 50 reddish bigger then 50 yellow, bigger then 100 green.
	return (
		<div className={infoCss.pokeGeneralWrapper}>
			<h2> pokemon Base stats</h2>
			<table className={infoCss.pokeGeneralData}>
				{pokemonFullInfoObj.stats.map((stat, index) => {
					let colorClass;
					const statPresent = (stat.base_stat * 100) / maxNum;

					switch (true) {
						case stat.base_stat < 50:
							colorClass = `${infoCss.statBar} ${infoCss.small}`;
							break;

						case stat.base_stat >= 50 && stat.base_stat < 100:
							colorClass = `${infoCss.statBar} ${infoCss.middle}`;
							break;

						case stat.base_stat >= 100:
							colorClass = `${infoCss.statBar} ${infoCss.big}`;
							break;

						default:
							colorClass = 'didnt worked';
					}

					return (
						<tr key={index}>
							<td className={infoCss.baseStatName}>{stat.stat.name}: </td>
							<th className={infoCss.statNum}>{stat.base_stat}</th>
							<th style={{ width: '100%' }}>
								<div className={infoCss.statWrapper}>
									<div style={{ width: `${statPresent}%` }} className={colorClass}></div>
								</div>
							</th>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

export default PokeomnBaseStats;
