import React from 'react';
import {
	ActivityIndicator,
	ImageBackground,
	StyleSheet,
	View,
	Text,
	ScrollView,
	Platform,
} from 'react-native';
import { Card } from 'react-native-elements';
import { Dimensions } from 'react-native';
import colors from '../styles/colors';
import * as db from '../../config/firebaseConfig';
import FormButton from '../screens/Auth/FormButton';
const windowHeight = Dimensions.get('window').height;
const screenWidth = Math.round(Dimensions.get('window').width);

export default function MovieDetails({
	userId,
	movie,
	isSaved,
	navigation,
	getMovie,
	setIsSaved,
}) {
	const {
		Actors,
		Awards,
		Poster,
		Director,
		Genre,
		Language,
		Metascore,
		Plot,
		Production,
		Rated,
		Released,
		Runtime,
		Website,
		Title,
		Writer,
		Year,
		imdbID,
		imdbRating,
	} = movie;

	const onAddMovie = async () => {
		await db.saveMovie(imdbID, movie, userId);
		setIsSaved(true);
		navigation.navigate('MyList');
	};
	if (!movie.Title) {
		return <ActivityIndicator color='white' size='large' />;
	}

	return (
		<View style={styles.innerView}>
			<Card
				wrapperStyle={{ color: colors.white }}
				containerStyle={{
					backgroundColor: colors.grey,
					marginTop: 40,
					marginBottom: 64,
				}}
			>
				<Card.Image
					source={{ uri: Poster }}
					alt=''
					resizeMode='cover'
					style={styles.image}
				/>
				<Text style={styles.title}>{Title}</Text>
				<Card.Divider />
				<View style={styles.container}>
					<Text style={styles.boldText}>Year: </Text>
					<Text style={styles.h4}>{Year}</Text>
					<Text style={styles.boldText}>Actors: </Text>
					<Text style={styles.h4}>{Actors}</Text>
					<Text style={styles.boldText}>Awards: </Text>
					<Text style={styles.h4}>{Awards}</Text>
					<Text style={styles.boldText}>Country: </Text>
					<Text style={styles.h4}>Country</Text>
					<Text style={styles.boldText}>Language: </Text>
					<Text style={styles.h4}>{Language}</Text>
					<Text style={styles.boldText}>Metascore: </Text>
					<Text style={styles.h4}>{Metascore}</Text>
					<Text style={styles.boldText}>Production: </Text>
					<Text style={styles.h4}>{Production}</Text>
					<Text style={styles.boldText}>Released: </Text>
					<Text style={styles.h4}>{Released}</Text>
					<Text style={styles.boldText}>Runtime: </Text>
					<Text style={styles.h4}>{Runtime}</Text>
					<Text style={styles.boldText}>Title: </Text>
					<Text style={styles.h4}>{Title}</Text>
					<Text style={styles.boldText}>Writers: </Text>
					<Text style={styles.h4}>{Writer}</Text>
					<Text style={styles.boldText}>Year: </Text>
					<Text style={styles.h4}>{Year}</Text>
					<Text style={styles.boldText}>imdb Rating: </Text>
					<Text style={styles.h4}>{imdbRating}</Text>
					<Text style={styles.boldText}>Director: </Text>
					<Text style={styles.h4}>{Director}</Text>
					<Text style={styles.boldText}>Genre: </Text>
					<Text style={styles.h4}>{Genre}</Text>
					<Text style={styles.boldText}>Plot: </Text>
					<Text style={styles.h4}>{Plot}</Text>
					<Text style={styles.boldText}>Rated: </Text>
					<Text style={styles.h4}>{Rated}</Text>
					{Website === true ? <Text style={styles.h4}>{Website}</Text> : null}
					<Text style={styles.boldText}>Plot: </Text>
					<Text style={styles.h4}>imdb rating: {imdbRating}</Text>
				</View>
				{!isSaved ? (
					<FormButton
						buttonType='outline'
						title='Save Movie'
						onPress={() => onAddMovie()}
						buttonColor={colors.white}
						backgroundColor={colors.red}
					/>
				) : (
					<FormButton
						buttonType='outline'
						title='Already Saved'
						disabled
						buttonColor={colors.white}
						backgroundColor={colors.grey}
					/>
				)}
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 'auto',
		padding: 10,
		height: 500,
	},
	card: {
		width: screenWidth,
	},

	h4: {
		fontSize: 14,
		lineHeight: 14 * 1.5,
		color: colors.white,
	},
	container: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 16,
	},
	boldText: {
		fontWeight: 'bold',
		color: colors.white,
		fontSize: 20,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	buttonContainer: {
		margin: 16,
		maxWidth: 500,
		minWidth: 320,
		width: '100%',
		backgroundColor: colors.black,
		alignSelf: 'center',
	},
	text: {
		color: 'white',
		fontSize: 20,
		lineHeight: 30,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	innerView: {
		maxWidth: 500,
		minWidth: 320,
		width: '100%',
		alignSelf: 'center',
		marginBottom: 64,
		marginTop: 64,
	},
	title: {
		alignSelf: 'center',
		fontSize: 40,
		padding: 12,
		color: colors.white,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
});
