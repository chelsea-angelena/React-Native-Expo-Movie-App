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
import colors from '../styles/colors';
import useSaved from '../Context/useSaved';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerWidth = 0.5 * windowWidth;

const SavedItem = ({ item, imdbId, userId, onDeleteItem }) => {
	const { id, Poster, Title } = item;
	// let imdbId = id;
	const navigation = useNavigation();
	if (!imdbId) {
		return <Text>Loading...</Text>;
	}
	return (
		<View style={styles.view}>
			<Card style={styles.card}>
				<TouchableOpacity
					onPress={() => navigation.navigate('SavedModal', { imdbId })}
				>
					<Card.Title style={styles.title}>{Title}</Card.Title>
					<Card.Divider />
					<Card.Image source={{ uri: Poster }} alt='' style={styles.image} />
				</TouchableOpacity>
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => onDeleteItem(item)}
						style={{ alignSelf: 'flex-end' }}
					>
						<MaterialCommunityIcons
							name='trash-can-outline'
							style={{ paddingTop: 12, marginRight: 12 }}
							size={24}
							color='black'
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('SavedModal', { imdbId })}
						style={{ alignSelf: 'flex-end' }}
					>
						<MaterialCommunityIcons
							name='chevron-right'
							style={{ paddingTop: 12, marginRight: 12 }}
							size={24}
							color='black'
						/>
					</TouchableOpacity>
				</View>
				<Card.Divider style={{ backgroundColor: 'white' }} />
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignSelf: 'center',
		textAlign: 'center',
		marginBottom: 88,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	card: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		textAlign: 'center',

		borderColor: 'white',
		borderWidth: 0.5,
		borderStyle: 'solid',
		borderRadius: 4,

		paddingRight: 16,
		paddingLeft: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		maxWidth: 500,
		minWidth: 280,
		// height: 300,
	},
	title: {
		color: colors.onyx,
		fontSize: 18,
		alignSelf: 'center',
		fontWeight: 'bold',
		paddingBottom: 16,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
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
		maxWidth: 500,
		minWidth: 280,
		height: 200,
	},
});

export default SavedItem;
