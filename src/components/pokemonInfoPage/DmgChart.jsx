import React from 'react';
import colorsCss from '../pokemonBox/Pokemon.module.css';
import infoCss from './pokemonInfo.module.css';
import useDmgChart from '../../Hooks/useDmgChart';

const DmgChart = ({ typesList }) => {
	const dmgToChartObj = {
		normal: 1,
		fighting: 1,
		flying: 1,
		poison: 1,
		ground: 1,
		rock: 1,
		bug: 1,
		ghost: 1,
		steel: 1,
		fire: 1,
		water: 1,
		grass: 1,
		electric: 1,
		psychic: 1,
		ice: 1,
		dragon: 1,
		dark: 1,
		fairy: 1,
	};
	const dmgFromChartObj = {
		normal: 1,
		fighting: 1,
		flying: 1,
		poison: 1,
		ground: 1,
		rock: 1,
		bug: 1,
		ghost: 1,
		steel: 1,
		fire: 1,
		water: 1,
		grass: 1,
		electric: 1,
		psychic: 1,
		ice: 1,
		dragon: 1,
		dark: 1,
		fairy: 1,
	};
	const chartData = typesList[1]
		? useDmgChart(typesList[0].type.url, typesList[1].type.url)
		: useDmgChart(typesList[0].type.url, '');

	if (chartData[0].isLoading || (chartData[1] && chartData[1].isLoading)) {
		return <>loading...</>;
	}
	for (let j = 0; j < chartData.length; j++) {
		for (let i = 0; i < chartData[j].data.damage_relations.double_damage_to.length; i++) {
			let typeName = chartData[j].data.damage_relations.double_damage_to[i].name;
			dmgToChartObj[typeName] *= 2;
		}
		for (let i = 0; i < chartData[j].data.damage_relations.half_damage_to.length; i++) {
			let typeName = chartData[j].data.damage_relations.half_damage_to[i].name;
			dmgToChartObj[typeName] *= 0.5;
		}
		for (let i = 0; i < chartData[j].data.damage_relations.no_damage_to.length; i++) {
			let typeName = chartData[j].data.damage_relations.no_damage_to[i].name;
			dmgToChartObj[typeName] *= 0;
		}

		for (let i = 0; i < chartData[j].data.damage_relations.double_damage_from.length; i++) {
			let typeName = chartData[j].data.damage_relations.double_damage_from[i].name;
			dmgFromChartObj[typeName] *= 2;
		}
		for (let i = 0; i < chartData[j].data.damage_relations.half_damage_from.length; i++) {
			let typeName = chartData[j].data.damage_relations.half_damage_from[i].name;
			dmgFromChartObj[typeName] *= 2;
		}
		for (let i = 0; i < chartData[j].data.damage_relations.no_damage_from.length; i++) {
			let typeName = chartData[j].data.damage_relations.no_damage_from[i].name;
			dmgFromChartObj[typeName] *= 2;
		}
	}
	return (
		<div className={infoCss.dmgChartSection}>
			<h1>DamageChart</h1>
			<div className={infoCss.chartWrapper}>
				<div className={infoCss.dmgToWrapper}>
					<p>
						The damage dealt <strong>to</strong> another pokemon types
					</p>
					<div className={infoCss.dmgChart}>
						{Object.entries(dmgToChartObj).map((dmgType, index) => {
							let dmgNumberUni;
							const dmgNameClass = `${colorsCss[dmgType[0]]} ${infoCss.dmgName}`;
							let shortName = dmgType[0].slice(0, 3);
							shortName = shortName.toUpperCase();
							switch (dmgType[1]) {
								case 0.5:
									dmgNumberUni = '\u00BD';
									break;
								case 0.25:
									dmgNumberUni = '\u00BC';
									break;
								default:
									dmgNumberUni = dmgType[1];
									break;
							}
							//TODO: style the dmgChart types.
							//TODO: make it for two types.
							return (
								<div key={index} className={infoCss.dmgType}>
									<div className={dmgNameClass}>{shortName}</div>
									<div className={infoCss.dmgNumber}>{dmgNumberUni}</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className={infoCss.dmgToWrapper}>
					<p>
						The damage dealt <strong>from</strong> another pokemon types
					</p>
					<div className={infoCss.dmgChart}>
						{Object.entries(dmgFromChartObj).map((dmgType, index) => {
							let dmgNumberUni;
							const dmgNameClass = `${colorsCss[dmgType[0]]} ${infoCss.dmgName}`;
							let shortName = dmgType[0].slice(0, 3);
							shortName = shortName.toUpperCase();
							switch (dmgType[1]) {
								case 0.5:
									dmgNumberUni = '\u00BD';
									break;
								case 0.25:
									dmgNumberUni = '\u00BC';
									break;
								default:
									dmgNumberUni = dmgType[1];
									break;
							}
							//TODO: style the dmgChart types.
							//TODO: make it for two types.
							return (
								<div key={index} className={infoCss.dmgType}>
									<div className={dmgNameClass}>{shortName}</div>
									<div className={infoCss.dmgNumber}>{dmgNumberUni}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DmgChart;
