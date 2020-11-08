import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import MovieDetails from './MovieDetails';
import api from '../api/api';
import * as db from '../../config/firebaseConfig.js';
import useSaved from '../Context/useSaved';
import {
	ImageBackground,
	ScrollView,
	Text,
	ActivityIndicator,
} from 'react-native';

export default function ModalScreen(props, { route, params }) {
	let movieId = props.route.params.imdbId;
	const [movie, setMovie] = useState({});
	const [savedList, setSavedList] = useState([]);
	const [isSaved, setIsSaved] = useState(false);
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
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					flexDirection: 'row',
					justifyContent: 'space-around',
					padding: 10,
				}}
			>
				<ActivityIndicator color='black' size='large' />
			</View>
		);
	}

	return (
		<ImageBackground
			alt='theatre'
			style={{ resizeMode: 'cover', height: '100%' }}
			source={{
				uri:
					'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
			}}
		>
			<ScrollView style={{ height: '100%' }}>
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
			</ScrollView>
		</ImageBackground>
	);
}
