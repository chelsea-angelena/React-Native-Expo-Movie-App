// import React from 'react';
// import { View, Text } from 'react-native';

// export default function SavedList(savedList={savedList}
//   onRefresh={onRefresh}
//   getNewSaved={getNewSaved}
//   wait={wait}) {
// 	return (
// 		<View style={styles.listView}>
// 			<FlatList
// 				style={styles.list}
// 				showsVerticalScrollIndicator={false}
// 				data={!refreshed ? savedMovieList : newMovieList}
// 				keyExtractor={(savedMovieList) => savedMovieList.id}
// 				renderItem={({ item }) => {
// 					return (
// 						<SavedItem
// 							item={item}
// 							onRefresh={onRefresh}
// 							refreshControl={<RefreshControl refreshing={refreshing} />}
// 						/>
// 					);
// 				}}
// 			/>
// 		</View>
// 	);
// }
