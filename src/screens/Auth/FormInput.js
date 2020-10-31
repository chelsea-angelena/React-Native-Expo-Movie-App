import React from 'react';
import { Input } from 'react-native-elements';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../styles/colors';

const FormInput = ({
	iconName,
	iconColor,
	returnKeyType,
	keyboardType,
	name,
	placeholder,
	...rest
}) => (
	<View style={styles.inputContainer}>
		<Input
			{...rest}
			leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
			placeholderTextColor='white'
			name={name}
			placeholder={placeholder}
		/>
	</View>
);

const styles = StyleSheet.create({
	inputContainer: {
		margin: 15,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		color: colors.white,
	},
	iconStyle: {
		marginRight: 10,
	},
});

export default FormInput;
