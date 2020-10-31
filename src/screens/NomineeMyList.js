import React, { useState } from 'react';
import {
	ScrollView,
	RefreshControl,
	View,
	ImageBackground,
	Text,
	StyleSheet,
	FlatList,
	Platform,
} from 'react-native';
import * as db from '../../config/firebaseConfig';
import SavedItem from './SavedItem';
import { Dimensions } from 'react-native';
import Screen from '../screens/Auth/Screen';
import colors from '../styles/colors';
import useSaved from '../Context/useSaved';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function MyList({ route, navigation }) {
	const [savedMovieList] = useSaved();
	const [refreshed, setRefreshed] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [newMovieList, setNewMovieList] = useState([]);

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const getNewSaved = async () => {
		try {
			let result = await db.getSavedMovies();
			setNewMovieList(result);
			setRefreshed(true);
		} catch (e) {
			console.log(e);
		}
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => getNewSaved());
		setRefreshing(false);
	}, []);

	return (
		<Screen>
			<ScrollView>
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
					{savedMovieList.length === 0 ? (
						<Text style={styles.caption}>
							Find your favorite movie's saved here
						</Text>
					) : null}
					<View style={styles.listView}>
						<FlatList
							style={styles.list}
							showsVerticalScrollIndicator={false}
							data={!refreshed ? savedMovieList : newMovieList}
							keyExtractor={(savedMovieList) => savedMovieList.id}
							renderItem={({ item }) => {
								return (
									<SavedItem
										item={item}
										onRefresh={onRefresh}
										refreshControl={<RefreshControl refreshing={refreshing} />}
									/>
								);
							}}
						/>
					</View>
				</ImageBackground>
			</ScrollView>
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
	},
	list: {
		paddingBottom: 64,
	},
});
