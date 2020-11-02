import React, { useMemo, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNav';
import AuthStack from './AuthStack';

export default function MainNav() {
	const user = useContext(AuthContext);
	// const [loading, setLoading] = useState(true);
	// const [user, setUser] = useState();
	// const [loading, setLoading] = useState(true);

	// const onAuthStateChanged = (user) => {
	// 	// if the user logs in or out, this will be called and the state will update.
	// 	// This value can also be accessed via: firebase.auth().currentUser
	// 	setUser({ user });
	// };

	// useEffect(() => {
	// const	unsubscribe = db.checkUserAuth(onAuthStateChanged);
	// 	// db.checkUserAuth(setUser), onAuthStateChanged();
	// 	// db.checkUserAuth((user) => {
	// 	// 	try {
	// 	// 		const userData = document.data();
	// 	// 		setLoading(false);
	// 	// 		setUser(userData);
	// 	// 	} catch (e) {
	// 	// 		setLoading(false);
	// 	// 	}
	// 	// });

	// }, []);

	return (
		<NavigationContainer>
			{!user ? <AuthStack /> : <TabNav user={user} />}
		</NavigationContainer>
	);
}
