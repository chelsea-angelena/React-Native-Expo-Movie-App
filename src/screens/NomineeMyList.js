import React, { useEffect, useState, useContext } from 'react';
import {
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	View,
	ImageBackground,
	Text,
	StyleSheet,
	FlatList,
	Platform,
} from 'react-native';
import { Image, Card, Divider } from 'react-native-elements';
import * as db from '../../config/firebaseConfig';
import SavedItem from './SavedItem';
import { Dimensions } from 'react-native';
import Screen from '../screens/Auth/Screen';
import colors from '../styles/colors';
import useSaved from '../Context/useSaved';
import { AuthContext } from '../Context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function MyList({ route, navigation }) {
	// const [newMovieList, setNewMovieList] = useState([]);
	const [savedList, setSavedList] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const user = useContext(AuthContext);
	const userId = user.uid;
	console.log(userId, 'userId');

	const getSaved = async () => {
		try {
			let saved = await db.getSavedMovies(userId);
			setSavedList(saved);
			setLoading(false);
		} catch (e) {
			setError(e);
		}
	};
	const deleteItem = async (item) => {
		try {
			await db.deleteMovieItem(item, userId);
		} catch (e) {
			setError(e);
		}
		getSaved();
	};
	useEffect(() => {
		getSaved();
	}, []);

	if (!userId) {
		return <Text>Loading...</Text>;
	}
	if (!savedList) {
		return <Text>Loading..</Text>;
	}
	return (
		<Screen>
			<ImageBackground
				alt='theatre'
				style={{
					resizeMode: 'cover',
					width: '100%',
					minHeight: windowHeight,
				}}
				source={{
					uri:
						'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
				}}
			>
				{savedList.length === 0 ? (
					<Text style={styles.caption}>
						Find your favorite movie's saved here
					</Text>
				) : null}

				<View style={styles.listView}>
					<FlatList
						style={styles.list}
						showsVerticalScrollIndicator={false}
						data={savedList}
						onDeleteItem={deleteItem}
						keyExtractor={(savedList) => savedList.id}
						renderItem={({ item }) => {
							return (
								<>
									<SavedItem
										item={item}
										userId={userId}
										onDeleteItem={deleteItem}
									/>

								</>
							);
						}}
					/>
				</View>
			</ImageBackground>
		</Screen>
	);
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
		fontSize: 32,
		alignSelf: 'center',
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
		marginBottom: 64,
	},
	list: {
		marginBottom: 64,
	},
});
