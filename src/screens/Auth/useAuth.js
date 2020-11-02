import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as db from '../../../config/firebaseConfig';
import { auth } from '../../../config/firebaseConfig';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import Firebase from '../../../config/firebaseConfig';

export const useAuth = () => {
	const [user, setUser] = useState(() => {
		auth.currentUser;
	});
	const [loading, setLoading] = useState(true);

	function onChange(user) {
		setUser(user);
		setLoading(false);
	}

	useEffect(() => {
		// listen for auth state changes
		const unsubscribe = auth.onAuthStateChanged(onChange);
		// unsubscribe to the listener when unmounting
		return () => unsubscribe();
	}, []);

	return [user, loading];
};
