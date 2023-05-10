import navCss from './Nav.module.css';
import React from 'react';
const Nav = () => {
	return (
		<div className={navCss.nav}>
			<div className={navCss.imageDiv}>
				<img src='./pokemon-logo.png' alt='asd' />
			</div>
			<h1>welcome to my pokeProject</h1>
		</div>
	);
};

export default Nav;
