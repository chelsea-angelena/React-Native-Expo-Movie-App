import React, { useState, useEffect, useContext } from 'react';

import * as db from '../../config/firebaseConfig';

export default (userId) => {
	const [savedList, setSavedList] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getSaved = async () => {
			try {
				let saved = await db.getSavedMovies(userId);
				setSavedList(saved);
				setLoading(false);
			} catch (e) {
				setError(e);
			}
		};
		getSaved();
	}, []);

	return [savedList, error, loading];
};
