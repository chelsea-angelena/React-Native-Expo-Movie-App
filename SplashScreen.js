import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default function SplashScreen() {
	return (
		<ImageBackground
			source={require('./assets/MovieSplash.png')}
			resizeMode='cover'
			style={{ width: '100%', height: 2500 }}
		></ImageBackground>
	);
}
