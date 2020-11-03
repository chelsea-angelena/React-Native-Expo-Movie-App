import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from './src/Context/AuthContext';
import { useAuth } from './src/screens/Auth/useAuth';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import MainNav from './src/navigation/MainNav';
console.disableYellowBox = true;
function App() {
	const [user, loading] = useAuth();

	let colorScheme = useColorScheme();

	if (loading) {
		return <ActivityIndicator size='large' color='white' />;
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
