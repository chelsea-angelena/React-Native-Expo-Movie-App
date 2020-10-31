import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, SignUpScreen } from '../screens/Auth';
import colors from '../styles/colors';

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='SignInScreen'
				component={SignInScreen}
				headerStyle={{ backgroundColor: colors.grey, headerTintColor: 'white' }}
				options={{
					title: 'Sign In',
					headerTransparent: true,
					headerTintColor: 'white',
					headerTitleAlign: 'center',
				}}
			/>
			<Stack.Screen
				name='SignUpScreen'
				component={SignUpScreen}
				headerStyle={{ backgroundColor: colors.grey }}
				options={{
					title: 'Sign Up',
					headerTransparent: true,
					headerTintColor: 'white',
					headerTitleAlign: 'center',
				}}
			/>
		</Stack.Navigator>
	);
}
