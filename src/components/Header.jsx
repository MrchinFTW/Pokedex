import headerCss from './Header.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
	return (
		<div className={headerCss.nav}>
			<Link className={headerCss.imageDiv} to={'/'}>
				<img src='/pokemon-logo.png' alt='asd' />
			</Link>
			<Link to={'/pokemon'} className={headerCss.headerLink}>
				{' '}
				Pokemon
			</Link>
			<Link to={'/about'} className={headerCss.headerLink}>
				{' '}
				about
			</Link>
		</div>
	);
};

export default Header;
