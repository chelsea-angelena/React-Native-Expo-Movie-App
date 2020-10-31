import React, { useState } from 'react';
import { Image, Card, Divider } from 'react-native-elements';
import {
	View,
	Platform,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import * as db from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useSaved from '../Context/useSaved';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerWidth = 0.5 * windowWidth;

const SavedItem = ({ item, onRefresh }) => {
	const { id, Poster, Title } = item;
	const navigation = useNavigation();
	const [savedMovieList] = useSaved();
	const [refreshedList, setRefreshedList] = useState([]);

	const onDeletePress = async () => {
		await db.deleteMovieItem(id);
		onRefresh();
	};

	return (
		<View style={styles.view}>
			<Card style={styles.card}>
				<TouchableOpacity
					onPress={() => navigation.navigate('Modal', { item })}
				>
					<Card.Title style={styles.title}>{Title}</Card.Title>
					<Card.Divider />
					<Card.Image source={{ uri: Poster }} alt='' style={styles.image} />
				</TouchableOpacity>
			</Card>
			<TouchableOpacity
				onPress={onDeletePress}
				style={{ alignSelf: 'flex-end' }}
			>
				<MaterialCommunityIcons
					name='trash-can-outline'
					style={{ paddingTop: 12, marginRight: 12 }}
					size={24}
					color='white'
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		alignSelf: 'center',
		marginTop: 24,
		borderColor: 'white',
		borderWidth: 0.5,
		borderStyle: 'solid',
		padding: 16,
		textAlign: 'center',
		borderRadius: 4,
		marginBottom: 20,
		overflow: 'hidden',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		maxWidth: 500,
		minWidth: 320,
	},

	text: {
		color: 'white',
		fontSize: 18,
		alignSelf: 'center',
		fontWeight: 'bold',
		paddingBottom: 16,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	image: {
		minWidth: 280,
		height: 400,
	},
});

export default SavedItem;
