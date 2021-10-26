import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useMovies = (options = {}) => {
	const query = useQuery(
		'movies',
		async () => {
			const response = await fetch('http://localhost:9000/api/movies', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error();
			}
			return data;
		},
		{ ...options },
	);
	return query;
};

export const useUpdateMovie = id => {
	const queryClient = useQueryClient();

	return useMutation(
		async payload => {
			const response = await fetch(`http://localhost:9000/api/movies/${id}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error();
			}
			return await response.json();
		},
		{
			onSuccess: data => {
				// we can either update the cache directly with the server response
				queryClient.setQueryData('movies', data);
				// or invalidate the query for future refetch
				// queryClient.invalidateQueries('movies');
			},
		},
	);
};
