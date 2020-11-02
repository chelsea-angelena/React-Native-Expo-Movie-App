import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as db from '../../config/firebaseConfig.js';

export default () => {
	const [user, setUser] = useState();
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState(true);

	const onAuthStateChanged = (user) => {
		setUser({ user });
	};

	useEffect(() => {
		// const unsubscribe = db.checkUserAuth(onAuthStateChanged);
		// db.checkUserAuth(setUser), onAuthStateChanged();
		// db.checkUserAuth((user) => {

		db.checkUserAuth(onAuthStateChanged);
		// const unsubscribe = async () => {
		// 	try {
		// 		await db.checkUserAuth(onAuthStateChanged);
		// 		setLoading(false);
		// 	} catch (e) {
		// 		setError(e);
		// 	}
		// };
		// unsubscribe();
		// 		setUser(userData);
		// 	} catch (e) {
		// setLoading(false);
		// 	}
		// });
	}, []);

	return [user];
};
