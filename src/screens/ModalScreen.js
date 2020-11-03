import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import MovieDetails from './MovieDetails';
import api from '../api/api';
import * as db from '../../config/firebaseConfig.js';
import useSaved from '../Context/useSaved';

export default function ModalScreen(props) {
	let movieId = props.route.params.item.imdbID;
	console.log(movieId, 'movieId');
	const [movie, setMovie] = useState({});
	const [savedList, setSavedList] = useState([]);
	console.log(savedList, 'savedList');
	const [isSaved, setIsSaved] = useState(false);
	console.log(isSaved, 'isSaved');

	const user = useContext(AuthContext);
	const userId = user.uid;
	const [error, setError] = useState(null);

	const navigation = useNavigation();

	const getMovie = async () => {
		try {
			let result = await api.get(`/api/${movieId}`);
			setMovie(result.data);
		} catch (e) {
			setError(e);
		}
	};

	const getSaved = async () => {
		try {
			let saved = await db
				.getSavedMovies(userId)
				.then((saved) => saved.filter((movie) => movie.id === movieId));
			console.log(saved), 'saved';
			setSavedList(saved);
			if (saved.length >= 1) {
				setIsSaved(true);
			}
		} catch (e) {
			setError(e);
		}
		getMovie();
	};

	useEffect(() => {
		getSaved();
	}, []);

	if (!movieId) {
		return <Text>Loading</Text>;
	}
	return (
		<>
			<MovieDetails
				imdbID={movieId}
				movie={movie}
				navigation={navigation}
				movieId={movieId}
				isSaved={isSaved}
				userId={userId}
				getMovie={() => getMovie()}
				setIsSaved={setIsSaved}
			/>
		</>
	);
}
