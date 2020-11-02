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
	console.log(user, 'user');
	// let [fontsLoaded] = useFonts({
	// 	'Montserr	at-Regular': require('./assets/Montserrat/Montserrat-Regular.ttf'),
	// });
	let colorScheme = useColorScheme();

	// if (error) {
	// 	return Alert.alert('error');
	// }
	if (loading) {
		return <Text>Loading..</Text>;
	}

	return (
		<AuthContext.Provider value={user}>
			<ThemeProvider useDark={colorScheme === 'dark'}>
				{/* <SavedProvider> */}
				{/* <Recaptcha /> */}
				<MainNav />

				{/* <CurrentUser /> */}
				{/* </SavedProvider> */}
			</ThemeProvider>
		</AuthContext.Provider>
	);
}
export default App;
