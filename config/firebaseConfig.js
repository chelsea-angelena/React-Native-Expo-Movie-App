import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import Constants from 'expo-constants';
import firebaseConfigDEV from '../firebaseInit';

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

export const loginWithEmail = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password);
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

export const getSavedMovies = async () => {
	let user = firebase.auth().currentUser;
	let userId = user.uid;
	let snapshot = await db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const deleteMovieItem = (id) => {
	let user = firebase.auth().currentUser;
	let userId = user.uid;
	return db
		.collection('users')
		.doc(userId)
		.collection('movies')
		.doc(id)
		.delete();
};
