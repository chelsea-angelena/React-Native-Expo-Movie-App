import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import MovieDetails from './MovieDetails';
import api from '../api/api';
import * as db from '../../config/firebaseConfig.js';

export default function ModalScreen(props, { item, route }) {
	let movieId = props.route.params.item.imdbID;
	let isVis = props.route.params.isSaved;
	const user = useContext(AuthContext);
	const userId = user.uid;
	const [movie, setMovie] = useState({});
	const [error, setError] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		const getMovie = async () => {
			try {
				let result = await api.get(`/api/${movieId}`);
				setMovie(result.data);
			} catch (e) {
				setError(e);
			}
		};
		getMovie();
	}, []);

	return (
		<>
			<MovieDetails
				id={movieId}
				movie={movie}
				navigation={navigation}
				movieId={movieId}
				isVis={isVis}
				userId={userId}
			/>
		</>
	);
}
