import React, { useState, useEffect, useContext } from 'react';
// import { SavedProvider } from './src/Context/SavedContext';
import * as db from './config/firebaseConfig';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import MainNav from './src/navigation/MainNav';

export const AuthContext = React.createContext();

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = db.checkUserAuth((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});
		return () => unsubscribe();
	}, []);

	let [fontsLoaded] = useFonts({
		'Montserrat-Regular': require('./assets/Montserrat/Montserrat-Regular.ttf'),
	});
	let colorScheme = useColorScheme();

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<AuthContext.Provider value={user}>
			<ThemeProvider useDark={colorScheme === 'dark'}>
				{/* <SavedProvider> */}
				<MainNav user={user} />
				{/* </SavedProvider> */}
			</ThemeProvider>
		</AuthContext.Provider>
	);
}
export default App;
