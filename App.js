import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from './src/Context/AuthContext';
import { useAuth } from './src/screens/Auth/useAuth';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import MainNav from './src/navigation/MainNav';
import * as SplashScreen from 'expo-splash-screen';

function App() {
	const [user, loading] = useAuth();

	let colorScheme = useColorScheme();

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
	}, []);


	if (!loading){
		SplashScreen.hideAsync();
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
