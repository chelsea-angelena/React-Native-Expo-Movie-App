import React, { useState, useEffect } from 'react';
import {
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-elements';
import colors from '../../styles/colors';
import useSaved from '../../Context/useSaved';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerWidth = 0.85 * windowWidth;

const ListItem = ({ navigation, title, year, imageUri, id, item }) => {
	const [savedList] = useSaved();
	const [isSaved, setIsSaved] = useState(false);
	const [loading, setloading] = useState(true);
	let imdbId = id;

	const checkSaved = () => {
		let saved = savedList.filter((movie) => movie.id === imdbId);
		if (saved.length >= 1) {
			setIsSaved(true);
		}
	};

	useEffect(() => {
		checkSaved();
	});

	return (
		<Card
			wrapperStyle={{ color: colors.white }}
			containerStyle={{
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				maxWidth: 500,
				minWidth: 320,
				width: '100%',
				alignSelf: 'center',
			}}
			style={styles.card}
		>
			<TouchableOpacity
				onPress={() => navigation.navigate('Modal', { imdbId })}
			>
				<Card.Title style={styles.title}>{title}</Card.Title>
				<Card.Title style={styles.subtitle}>{year}</Card.Title>
				<Card.Divider style={styles.divider} />

				<Card.Image
					resizeMode='contain'
					wrapperStyle={styles.wrapper}
					alt=''
					style={styles.image}
					source={{ uri: imageUri }}
				/>
			</TouchableOpacity>
		</Card>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		minWidth: 300,
		maxWidth: 500,

		width: '100%',
		alignSelf: 'center',
	},
	card: {
		borderRadius: 15,
		marginBottom: 20,
		overflow: 'hidden',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',

		maxWidth: 500,
		minWidth: 320,
		width: '100%',
		alignSelf: 'center',
	},
	detailsContainer: {
		padding: 20,
	},
	image: {
		height: 400,
	},
	subtitle: {
		fontWeight: 'bold',
		color: colors.white,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	title: {
		marginBottom: 7,
		color: colors.white,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	divider: {
		marginTop: 8,
	},
});
