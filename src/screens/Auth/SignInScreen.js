import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import {
	View,
	Alert,
	Image,
	Dimensions,
	ImageBackground,
	StyleSheet,
	Platform,
	Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import FormButton from './FormButton';
import ErrorMessage from './ErrorMessage';
import * as db from '../../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import colors from '../../styles/colors';
import Screen from './Screen';
import { AntDesign } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerWidth = 0.95 * windowWidth;

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(6, 'Password must have at least 6 characters '),
});

const SignInScreen = () => {
	const user = useContext(AuthContext);
	const [error, setError] = useState(null);
	const navigation = useNavigation();
	const goToSignup = () => navigation.navigate('SignUpScreen');

	const GoogleSignIn = async () => {
		await db.Goologin();
	};

	const handleLogin = async (values) => {
		const { email, password } = values;
		try {
			await db.signIn(email, password);
		} catch (e) {
			setError(e);
		}
	};
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
					<View style={styles.innerView}>
						<Formik
							initialValues={{ email: '', password: '' }}
							onSubmit={(values) => {
								handleLogin(values);
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
							}) => (
								<>
									<FormInput
										name='email'
										value={values.email}
										onChangeText={handleChange('email')}
										placeholder='Enter email'
										autoCapitalize='none'
										iconName='ios-mail'
										iconColor='#2C384A'
										style={{ color: colors.white }}
										onBlur={handleBlur('email')}
									/>
									<ErrorMessage errorValue={touched.email && errors.email} />
									<FormInput
										name='password'
										style={{ color: colors.white }}
										value={values.password}
										onChangeText={handleChange('password')}
										placeholder='Enter password'
										secureTextEntry
										iconName='ios-lock'
										iconColor='#2C384A'
										onBlur={handleBlur('password')}
									/>
									<ErrorMessage
										errorValue={touched.password && errors.password}
									/>

									<FormButton
										buttonType='outline'
										onPress={handleSubmit}
										title='LOGIN'
										buttonColor={colors.white}
										backgroundColor={colors.red}
										disabled={!isValid}
									/>

									<ErrorMessage errorValue={errors.general} />
								</>
							)}
						</Formik>

						{error
							? Alert.alert('Please try Sign In again, or, Sign Up')
							: null}
						<Button
							icon={
								<Icon
									name='google'
									type='ant-design'
									style={{ paddingRight: 32 }}
									size={24}
									color='white'
								/>
							}
							iconLeft
							title='Sign In With Google'
							onPress={GoogleSignIn}
							style={{ borderRadius: 40, margin: 24 }}
						/>
						<Button
							title="Don't have an account? Sign Up"
							onPress={goToSignup}
							titleStyle={{
								color: colors.white,
							}}
							type='clear'
						/>
					</View>
				</KeyboardAwareScrollView>
			</ImageBackground>
		</Screen>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		margin: 25,
	},
	innerView: {
		width: innerWidth,
		alignSelf: 'center',
		// backgroundColor: 'rgba(0,0,0,.7)',
		// paddingTop: 32,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		color: colors.white,
	},
	errorView: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SignInScreen;
