import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
	ImageBackground,
	Platform,
	StyleSheet,
	Dimensions,
	View,
	Alert,
	Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import * as db from '../../../config/firebaseConfig';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CheckBox, Button } from 'react-native-elements';

import ErrorMessage from './ErrorMessage';
import Screen from './Screen';
import colors from '../../styles/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerWidth = 0.95 * windowWidth;
const validationSchema = Yup.object().shape({
	displayName: Yup.string()
		.label('Name')
		.required()
		.min(2, 'Must have at least 2 characters'),
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(4, 'Password must have more than 4 characters '),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
		.required('Confirm Password is required'),
});

const SignUpScreen = () => {
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	const goToLogIn = () => {
		navigation.navigate('SignInScreen');
	};

	const handleSignUp = async (values) => {
		const { email, password, displayName } = values;
		try {
			const response = await db.signupWithEmail(email, password);
			await db.createNewUser({
				email: response.user.email,
				uid: response.user.uid,
				displayName: displayName,
			});
		} catch (error) {
			setError(error.message);
		}
	};

	if (error) {
		return Alert.alert('Unable to register, do you already have an account?');
	}
	return (
		<Screen>
			<ImageBackground
				alt='theatre'
				style={{
					resizeMode: 'cover',
					height: windowHeight,
					paddingBottom: 64,
					paddingTop: 32,
				}}
				SameSite='Strict'
				source={{
					uri:
						'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
				}}
			>
				<KeyboardAwareScrollView>
					<Image
						source={require('../../../assets/appTitle.png')}
						alt='Logo'
						style={{
							alignSelf: 'center',
							marginTop: 64,
						}}
					/>
					<Formik
						initialValues={{
							displayName: '',
							email: '',
							password: '',
							confirmPassword: '',
							check: false,
						}}
						onSubmit={(values) => {
							handleSignUp(values);
						}}
						validationSchema={validationSchema}
					>
						{({
							handleChange,
							values,
							handleSubmit,
							errors,
							isValid,
							touched,
							handleBlur,
							isSubmitting,
							setFieldValue,
						}) => (
							<>
								<View style={styles.innerView}>
									<FormInput
										displayName='displayName'
										value={values.displayName}
										onChangeText={handleChange('displayName')}
										placeholder='Enter your full name'
										iconName='md-person'
										iconColor='#2C384A'
										style={{ color: colors.white }}
										onBlur={handleBlur('displayName')}
									/>
									<ErrorMessage errorValue={touched.name && errors.name} />
									<FormInput
										name='email'
										value={values.email}
										onChangeText={handleChange('email')}
										placeholder='Enter email'
										autoCapitalize='none'
										iconName='ios-mail'
										iconColor='#2C384A'
										onBlur={handleBlur('email')}
										style={{ color: colors.white }}
									/>
									<ErrorMessage errorValue={touched.email && errors.email} />
									<FormInput
										name='password'
										value={values.password}
										onChangeText={handleChange('password')}
										placeholder='Enter password'
										iconName='ios-lock'
										iconColor='#2C384A'
										onBlur={handleBlur('password')}
										secureTextEntry
										style={{ color: colors.white }}
									/>
									<ErrorMessage
										errorValue={touched.password && errors.password}
									/>
									<FormInput
										name='password'
										value={values.confirmPassword}
										onChangeText={handleChange('confirmPassword')}
										placeholder='Confirm password'
										iconName='ios-lock'
										iconColor='#2C384A'
										onBlur={handleBlur('confirmPassword')}
										secureTextEntry
									/>

									<ErrorMessage
										errorValue={
											touched.confirmPassword && errors.confirmPassword
										}
									/>
									<View style={styles.buttonContainer}>
										<FormButton
											buttonType='outline'
											onPress={handleSubmit}
											title='SIGNUP'
											buttonColor={colors.white}
											disabled={!isValid || isSubmitting}
											loading={isSubmitting}
											style={{ color: colors.white }}
											backgroundColor={colors.red}
										/>
									</View>
									<ErrorMessage errorValue={errors.general} />
								</View>
							</>
						)}
					</Formik>

					<Button
						title='Have an account? Login'
						onPress={goToLogIn}
						titleStyle={{
							color: colors.white,
						}}
						type='clear'
					/>
				</KeyboardAwareScrollView>
			</ImageBackground>
		</Screen>
	);
};

export default SignUpScreen;
const styles = StyleSheet.create({
	logoContainer: {
		marginBottom: 15,
		alignItems: 'center',
	},
	buttonContainer: {
		margin: 25,
	},
	checkBoxContainer: {
		backgroundColor: colors.onyx,
		borderColor: '#fff',
	},
	innerView: {
		width: innerWidth,
		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,.7)',
		// paddingTop: 32,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		color: colors.white,
	},
});
