import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import Constants from 'expo-constants';
import firebaseConfigDEV from '../firebaseInit';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
let Firebase = firebase.initializeApp(firebaseConfigDEV);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const Goologin = async () => {
	try {
		const result = await Google.logInAsync({
			androidClientId: Constants.manifest.extra.androidClientId,
			iosClientId: Constants.manifest.extra.iosClientId,
			scopes: ['profile', 'email'],
			redirectUri: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
		});
		if (result.type === 'success') {
			const credential = firebase.auth.GoogleAuthProvider.credential(
				result.idToken,
				result.accessToken
			);
			auth.signInWithCredential(credential).catch((error) => {
				console.error(e);
			});
		} else {
			alert('login: Error:' + message);
		}
	} catch ({ message }) {
		alert('login: Error:' + message);
	}
};

export const signIn = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password).then((response) => {
		const uid = response.user.uid;
		db.collection('users')
			.doc(uid)
			.get()
			.then((firestoreDocument) => {
				if (!firestoreDocument.exists) {
					alert('User does not exist anymore.');
					return;
				}
				const user = firestoreDocument.data();
			});
	});
};

export const signupWithEmail = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
	await auth.signOut();
};

export const checkUserAuth = (cb) => {
	return auth.onAuthStateChanged(cb);
};

export const createNewUser = (userData) => {
	return db.collection('users').doc(`${userData.uid}`).set(userData);
};

export const saveMovie = async (imdbID, movie, userId) => {
	let { Title, Poster } = movie;
	await db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.doc(imdbID)
		.set({
			id: imdbID,
			imdbID: imdbID,
			Title: Title,
			Poster: Poster,
			created: firebase.firestore.FieldValue.serverTimestamp(),
			authorID: userId,
		});
};
export const getUser = () => {
	let user = firebase.auth().currentUser;
	return user;
};
export const getSavedMovies = async (userId) => {
	let snapshot = await db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const deleteMovieItem = (item, userId) => {
	let { id } = item;
	return db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.doc(id)
		.delete();
};
export default Firebase;
