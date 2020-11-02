// import React from 'react';
// import { View, Text } from 'react-native';
// import { useAuthState } from 'react-firebase-hooks/auth';

// export default function AuthSignIn(){

// const login = () => {
//   firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');
// };
// const logout = () => {
//   firebase.auth().signOut();
// };

// const CurrentUser = () => {
//   const [user, loading, error] = useAuthState(firebase.auth());

//   if (loading) {
//     return (
//       <div>
//         <p>Initialising User...</p>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//       </div>
//     );
//   }
//   if (user) {
//     return (
//       <div>
//         <p>Current User: {user.email}</p>
//         <button onClick={logout}>Log out</button>
//       </div>
//     );
//   }
//   return <button onClick={login}>Log in</button>;
// };

import React from 'react';
import { View, Text } from 'react-native';

import * as db from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AuthContext = React.createContext();

// export default ({ children }) => {
// 	const user = useAuthState();
// 	useEffect(() => {
// 		const unsubscribe = db.checkUserAuth((setUser) => {
// 			if (user) {
// 				setUser(user);
// 			} else {
// 				setUser(false);
// 			}
// 		});
// 		return () => unsubscribe();
// 	}, []);

// 	return <AuthContext.Provider user={user}>{children}</AuthContext.Provider>;
// };
