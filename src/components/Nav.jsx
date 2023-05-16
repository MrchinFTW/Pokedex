import navCss from './Nav.module.css';
import React from 'react';
import SearchBar from './SearchBar';
const Nav = () => {
	return (
		<div className={navCss.nav}>
			<div className={navCss.imageDiv}>
				<img src='pokemon-logo.png' alt='asd' />
			</div>
			<SearchBar />
		</div>
	);
};

export default Nav;
