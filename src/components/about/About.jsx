import React from 'react';
import aboutCss from './aboutCss.module.css';

const About = () => {
	return (
		<div className={aboutCss.about}>
			<h1>About</h1>
			<div>
				<p>
					About the man behine this site is a very eager fullstack junior that realy likes Pokémon.
				</p>
				<p>
					In the prosses of building this site I used{' '}
					<strong> React, TanStack Query, React Router, CSS, HTML </strong>{' '}
				</p>
				<p>
					for all the data I thank <strong>A LOT</strong> to{' '}
					<a href='https://pokeapi.co/' target='_blank' className={aboutCss.links}>
						PokeApi
					</a>{' '}
					for all the data!
				</p>
				<p>
					You can chack out the code on my{' '}
					<a href='https://github.com/MrchinFTW/pokedex' target='_blank' className={aboutCss.links}>
						Git Account
					</a>
				</p>
			</div>
		</div>
	);
};

export default About;
