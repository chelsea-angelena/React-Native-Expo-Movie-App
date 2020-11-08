import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthContext } from './src/Context/AuthContext';
import { useAuth } from './src/screens/Auth/useAuth';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import MainNav from './src/navigation/MainNav';
import * as SplashScreen from 'expo-splash-screen';

function App() {
	const [user, loading] = useAuth();

	let colorScheme = useColorScheme();

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					flexDirection: 'row',
					justifyContent: 'space-around',
					padding: 10,
				}}
			>
				<View style={{ flexDirection: 'column', alignSelf: 'center' }}>
					<ActivityIndicator color='black' size='large' />
					<Text>Loading up our Database...</Text>
				</View>
			</View>
		);
	}
	return (
		<>
			<AuthContext.Provider value={user}>
				<ThemeProvider useDark={colorScheme === 'dark'}>
					<MainNav />
				</ThemeProvider>
			</AuthContext.Provider>
		</>
	);
}
export default App;
