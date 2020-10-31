// useEffect(() => {
// 	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
// 		if (user) {
// 			setUser(user);
// 		} else {
// 			setUser(false);
// 		}
// 	});
// 	return () => unsubscribe();
// }, []);