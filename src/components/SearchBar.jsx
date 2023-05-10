import SearchCss from './SearchBarCss.module.css';
import Generation from './searchTypes/Generation';
import Color from './searchTypes/Color';
import Type from './searchTypes/Type';
import React from 'react';

const SearchBar = () => {
	return (
		<>
			<div className={SearchCss.SearchNav}>
				<div>gen</div>
				<div>type</div>
				<div>name</div>
				<div>color</div>
			</div>

			<Generation />
			<Type />
			<Color />
		</>
	);
};

export default SearchBar;
