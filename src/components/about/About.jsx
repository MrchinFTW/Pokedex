import React from 'react';
import aboutCss from './aboutCss.module.css';
import { useState } from 'react';

const About = () => {
	const [isActive, setIsActive] = useState('');
	const imageTitleHandler = (title) => {
		setIsActive(title);
	};

	const images = [
		{
			title: 'React',
			link: 'https://react.dev/',
		},
		{
			title: 'TanStackQuery',
			link: 'https://tanstack.com/query/v4',
		},
		{
			title: 'ReactRouter',
			link: 'https://reactrouter.com/en/main',
		},
		{
			title: 'CSS',
			link: 'https://www.w3.org/Style/CSS/Overview.en.html',
		},
		{
			title: 'HTML',
			link: 'https://html.com/',
		},
	];

	const social = [
		{
			title: 'GitHub',
			link: 'https://github.com/MrchinFTW',
		},
		{
			title: 'LinkedIn',
			link: 'https://www.linkedin.com/in/nir-avraham-847271231/',
		},
	];
	let titleClass;
	return (
		<div className={aboutCss.about}>
			<h1>About</h1>
			<div className={aboutCss.textWrapper}>
				<p className={aboutCss.textP}>
					About the man behine this site is a very eager Jr. Full Stack developer that realy likes
					Pokémon.
				</p>
				<p className={aboutCss.textP}>In the prosses of building this site I used: </p>
				<div className={aboutCss.imagesWrapper}>
					{images.map((image) => {
						return (
							<div className={aboutCss.imageWrapper}>
								<a
									onMouseEnter={() => imageTitleHandler(image.title)}
									onMouseLeave={() => imageTitleHandler('')}
									href={image.link}
									target='_blank'
									rel='noreferrer'
								>
									<img
										className={aboutCss.images}
										src={`/images/${image.title}.png`}
										alt={`${image.title}`}
									/>
								</a>
								{/* {activeTitle === image.title ? <p>{image.title}</p> : null} */}

								{isActive === image.title ? (
									<p className={aboutCss.imageTitleShown}>{image.title}</p>
								) : (
									<p className={aboutCss.imageTitleHidden}>{image.title}</p>
								)}
							</div>
						);
					})}
				</div>
				<p className={aboutCss.textP}>
					for all the data I thank <strong>A LOT</strong> to{' '}
					<a href='https://pokeapi.co/' target='_blank' className={aboutCss.links}>
						PokeApi
					</a>{' '}
					for all the data!
				</p>
				<p className={aboutCss.textP}>
					You can chack out the code on my{' '}
					<a href='https://github.com/MrchinFTW/pokedex' target='_blank' className={aboutCss.links}>
						Git Account
					</a>{' '}
					and you can meet me here:
				</p>
				<div className={aboutCss.imagesWrapper}>
					{social.map((image) => {
						return (
							<div className={aboutCss.imageWrapper}>
								<a
									onMouseEnter={() => imageTitleHandler(image.title)}
									onMouseLeave={() => imageTitleHandler('')}
									href={image.link}
									target='_blank'
									rel='noreferrer'
								>
									<img
										className={aboutCss.images}
										src={`/images/${image.title}.png`}
										alt={`${image.title}`}
									/>
								</a>
								{/* {activeTitle === image.title ? <p>{image.title}</p> : null} */}

								{isActive === image.title ? (
									<p className={aboutCss.imageTitleShown}>{image.title}</p>
								) : (
									<p className={aboutCss.imageTitleHidden}>{image.title}</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default About;
