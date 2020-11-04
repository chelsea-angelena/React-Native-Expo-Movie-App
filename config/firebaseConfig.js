import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import Constants from 'expo-constants';
import firebaseConfigDEV from '../firebaseInit';
import * as Google from 'expo-google-app-auth';
// const initFirebase = () => {
// 	let releaseChannel = Constants.manifest.version;
// 	if (process.env.NODE_ENV !== 'development') {
// 		let Firebase = firebase.initializeApp(firebaseConfigDEV);
// 	}
// 	if (process.env.NODE_ENV === 'production') {
// 		let Firebase = firebase.initializeApp(firebaseConfigDEV);
// 	}
// 	if (releaseChannel === 'staging') {
// 		return ENV.staging;
// 	}
// };
// initFirebase();

let Firebase = firebase.initializeApp(firebaseConfigDEV);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const signInWithGoogle = async () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	await auth.signInWithPopup(provider);
	window.location.reload();
};

export const Goologin = async () => {
	try {
		//await GoogleSignIn.askForPlayServicesAsync();
		const result = await Google.logInAsync({
			iosClientId: Constants.manifest.extra.iosClientId,
			androidClientId: Constants.manifest.extra.androidClientId,
		});
		if (result.type === 'success') {
			console.log(result);

			const credential = firebase.auth.GoogleAuthProvider.credential(
				result.idToken,
				result.accessToken
			);
			auth.signInWithCredential(credential).catch((error) => {
				console.error(e)
			});
		} else {
			alert('login: Error:' + message);
		}
	} catch ({ message }) {
		alert('login: Error:' + message);
	}
};

// export const signInWithGoogle = async () => {
// 	try {
// 		const result = await Expo.Google.signIn({
// 			androidClientId: androidClientId,
// 			iosClientId: IOSClientId,
// 			behavior: 'web',
// 			iosClientId: '', //enter ios client id
// 			scopes: ['profile', 'email'],
// 		});

// 		if (result.type === 'success') {
// 			await firebase
// 				.auth()
// 				.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// 			const credential = firebase.auth.GoogleAuthProvider.credential(
// 				data.idToken,
// 				data.accessToken
// 			);
// 			const googleProfileData = await firebase
// 				.auth()
// 				.signInWithCredential(credential);
// 			this.onLoginSuccess.bind(this);
// 		}
// 	} catch ({ message }) {
// 		alert('login: Error:' + message);
// 	}
// };

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

// export const signInWithGoogle = async () => {
// 	const provider = Firebase.auth.GoogleAuthProvider();
// 	await auth.signInWithPopup(provider).then(() =>
// 		auth()
// 			.signInWithEmailAndPassword(email, password)
// 			.then((response) => {
// 				const uid = response.user.uid;
// 				const usersRef = firebase.firestore().collection('users');
// 				usersRef
// 					.doc(uid)
// 					.get()
// 					.then((firestoreDocument) => {
// 						const user = firestoreDocument.data();
// 						return firestoreDocument;
// 					});
// 			})
// 	);
// };

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
