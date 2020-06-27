import React, { useState,useEffect } from 'react';
import { Card, Title,IconButton} from 'react-native-paper';
import {useNavigation,useRoute} from '@react-navigation/native'

import {
	StyleSheet,
	TouchableOpacity, 	
	FlatList, 
	ActivityIndicator,
	View,
	RefreshControl,
	Text} from 'react-native';


const styles = StyleSheet.create({
  content:{
    justifyContent: 'flex-start',
    padding: 0
	},
	recipeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }, recipeIconsAndInfo: {
		alignItems: 'center',
		flexDirection: 'row',
    },
    recipeInfoColor: {
        color: "#545454"
	},
	titulo: {
		textAlign: "center",
		color: "#545454",
		fontSize: 19,
		fontWeight:"300",
		/*fontFamily:""*/
	  }
})


export default function Card_Component(props) {
	const navegation = useNavigation();
	const [refreshing, setRefreshing] = useState(false);

	function navigateToDetail(recipe){
        navegation.navigate('Recipe',{recipe});
	}

	const renderFooter = () => {
		if (!props.loading) return null
		return (
		  <View
			style={{
			  paddingVertical: 20,
			}}>
			<ActivityIndicator animating size='large' color="#ff914d"/>
		  </View>
		)
	}
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await props.onRefresh();
		setRefreshing(false);
	  }, [refreshing]);

	const renderItem = ({item:recipe}) => (
		 <Card style={{padding: 10,margin:5}} elevation={2}>
		  <TouchableOpacity onPress={() => navigateToDetail(recipe)}>
			<Card.Cover source={{ uri: recipe.imagem}} />
			<View>  
			  <Title style={styles.titulo}>{recipe.titulo}</Title>
			</View>
			<View style={styles.recipeInfo}>
				<View style={styles.recipeIconsAndInfo}>
					<IconButton style={styles.recipeIcons}
						icon="clock-outline"
						color="#ff914d"
						size={25}
					/>
					<Text style={styles.recipeInfoColor}>{recipe.tempo_preparo}</Text>
				</View>
				<View style={styles.recipeIconsAndInfo}>
					<IconButton style={styles.recipeIcons}
						icon="silverware"
						color="#ff914d"
						size={25}
					/>
					<Text style={styles.recipeInfoColor}>{recipe.rendimento}</Text>
				</View>
			</View>
		  </TouchableOpacity>
		</Card>
	);
	
    return (  
      <>
      {(props.receitas !== undefined) &&
          <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
				showsVerticalScrollIndicator = {false}
				initialNumToRender = {3}
                data={props.receitas}
                keyExtractor={receita => String(receita.id)}
				renderItem={renderItem}
				ListFooterComponent={renderFooter}
				onEndReached={!props.func ? () => {} : props.func}
                onEndReachedThreshold={0.1}
                refreshControl={
                  <RefreshControl colors={["#ff914d"]} refreshing={refreshing} onRefresh={onRefresh} />
                }
            />       
      }
      </>
    )  
}