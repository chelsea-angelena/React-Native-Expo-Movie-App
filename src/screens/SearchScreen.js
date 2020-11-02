import React, { useState, useEffect } from 'react';
import {
	View,
	Platform,
	Text,
	StyleSheet,
	ImageBackground,
	Dimensions,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import FormButton from './Auth/FormButton';
import DataList from '../components/searchscreen/DataList';
import colors from '../styles/colors';
import api from '../api/api';
import Screen from './Auth/Screen';

// const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchScreen = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const updateSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};

	const submitSearch = async () => {
		try {
			let response = await api.get(`/api/movies/${searchTerm}`);
			setMovies(response.data.Search);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		submitSearch('');
	}, []);

	return (
		<Screen>
			<ImageBackground
				alt='theatre'
				style={{ resizeMode: 'cover', height: windowHeight }}
				source={{
					uri:
						'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
				}}
			>
				<View style={styles.innerView}>
					<SearchBar
						placeholder='Type Here to Search...'
						onChangeText={updateSearch}
						value={searchTerm}
						onEndEditing={submitSearch}
						style={{ color: colors.white }}
					/>

					{searchTerm ? (
						<FormButton
							buttonType='outline'
							onPress={submitSearch}
							title='Submit'
							buttonColor={colors.white}
							backgroundColor={colors.red}
						/>
					) : (
						<>

									<Text style={styles.text}>Welcome to The Movie App!</Text>
									<Text style={styles.subText}>
										Search for your favorite films and save your collection
									</Text>
								</>


					)}

					<DataList movies={movies} error={error} loading={loading} />
				</View>
			</ImageBackground>
		</Screen>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	button: {
		color: 'white',
		backgroundColor: colors.grey,
		width: 400,
		height: 56,
		borderRadius: 8,
		marginLeft: 24,
		marginRight: 24,
		alignSelf: 'center',
	},
	text: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 24,
		marginLeft: 24,
		marginRight: 24,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	subText: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		marginTop: 24,
		marginLeft: 24,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		marginRight: 24,
	},
	innerView: {
		minWidth: 280,
		maxWidth: 500,
		width: '100%',
		alignSelf: 'center',
		marginBottom: 12,
		marginTop: 32,
		marginBottom: 32,
		minHeight: windowHeight,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	text: {
		padding: 16,
		color: 'white',
		fontSize: 32,
		alignSelf: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},

	caption: {
		color: colors.white,
		alignSelf: 'center',
		marginTop: 24,
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	listView: {
		height: '100%',
	},
	list: {
		paddingBottom: 64,
	},
});
