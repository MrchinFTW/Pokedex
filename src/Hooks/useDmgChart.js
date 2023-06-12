import { useQuery } from '@tanstack/react-query';

const useDmgChart = (url1, url2) => {
	const result1 = useQuery([url1], () => fetch(url1).then((res) => res.json()));
	const result2 = useQuery([url2], () => fetch(url2).then((res) => res.json()));

	if (url2 !== '') {
		return [result1, result2];
	}

	return [result1];
};

export default useDmgChart;
