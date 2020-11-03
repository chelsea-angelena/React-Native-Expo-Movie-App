import 'react-native-gesture-handler';
import React from 'react';
import { Alert, Text } from 'react-native';
import { AuthContext } from './src/Context/AuthContext';
import { useAuth } from './src/screens/Auth/useAuth';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import { useFonts } from 'expo-font';
import MainNav from './src/navigation/MainNav';
import SplashScreen from './SplashScreen';

function App() {
	const [user, loading] = useAuth();

	let colorScheme = useColorScheme();

	if (loading) {
		return <Text>Loading..</Text>;
	}

	return (
		<AuthContext.Provider value={user}>
			<ThemeProvider useDark={colorScheme === 'dark'}>
				<MainNav />
			</ThemeProvider>
		</AuthContext.Provider>
	);
}
export default App;
