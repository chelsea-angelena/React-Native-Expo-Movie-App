import 'react-native-gesture-handler';
import React from 'react';
import ModalScreen from '../screens/ModalScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import NomineeMylist from '../screens/MyList';

const Stack = createStackNavigator();

function StackNav() {
	return (
		<Stack.Navigator
			mode='modal'
			screeenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='Search'
				component={SearchScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Modal'
				component={ModalScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				options={{ headerShown: false }}
				name='MyList'
				component={NomineeMylist}
			/>
			<Stack.Screen
				name='SavedModal'
				component={ModalScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default StackNav;
