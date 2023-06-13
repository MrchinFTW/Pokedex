import React from 'react';
import { useLocation } from 'react-router-dom';
const ErrorPage = () => {
	const { state } = useLocation();

	return (
		<div>
			<h1>error page</h1>
			{state ? <div>{state}</div> : <></>}
		</div>
	);
};

export default ErrorPage;
