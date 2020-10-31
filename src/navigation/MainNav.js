import React, { useContext } from 'react';
// import { AuthContext } from '../../App';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNav';
import AuthStack from './AuthStack';

export default function MainNav({ user }) {
	return (
		<NavigationContainer>
			{!user ? <AuthStack /> : <TabNav />}
		</NavigationContainer>
	);
}
