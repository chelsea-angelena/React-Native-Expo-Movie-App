import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GoToModal({ ModalScreen }) {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(ModalScreen)}
		></TouchableOpacity>
	);
}
