import React from 'react';
import { Button } from 'react-native-elements';

const FormButton = ({
	title,
	buttonType,
	backgroundColor,
	buttonColor,
	...rest
}) => (
	<Button
		{...rest}
		type={buttonType}
		title={title}
		buttonStyle={{ borderColor: buttonColor }}
		style={{ backgroundColor: backgroundColor }}
		titleStyle={{ color: buttonColor }}
	/>
);

export default FormButton;
