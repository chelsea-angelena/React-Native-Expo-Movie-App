import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import * as db from '../../config/firebaseConfig';

export default () => {
	const [savedList, setSavedList] = useState([]);

	useEffect(() => {
		const getSaved = async () => {
			try {
				let saved = await db.getSavedMovies();
				setSavedList(saved);
			} catch (e) {
				setError(e);
			}
		};
		getSaved();
	}, []);

	return [savedList];
};
