import React from 'react';
import { View, Text } from 'react-native';
import MyList from '../screens/MyList';
import SavedModal from '../screens/SavedModal';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ListStack() {
	return (
		<Stack.Navigator
			mode='modal'
			headerMode='screen'
			initialRouteName='MyListScreen'
			screeenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				component={MyList}
				name='MyListScreen'
				options={{ title: 'Saved Movies', headerShown: false }}
			/>
			<Stack.Screen
				component={SavedModal}
				name='SavedModal'
				options={{ title: 'Movie Details', headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
