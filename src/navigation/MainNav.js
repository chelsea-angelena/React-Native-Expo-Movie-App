import React, { useMemo, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNav';
import AuthStack from './AuthStack';

export default function MainNav() {
	const user = useContext(AuthContext);
	return (
		<NavigationContainer>
			{!user ? <AuthStack /> : <TabNav user={user} />}
		</NavigationContainer>
	);
}
