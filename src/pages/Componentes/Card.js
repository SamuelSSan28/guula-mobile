import React, { useState } from 'react';
import { Card, Title,IconButton} from 'react-native-paper';
import {useNavigation,useRoute} from '@react-navigation/native'

import {
	StyleSheet,
	TouchableOpacity, 	
	FlatList, 
	ActivityIndicator,
	View,
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
		fontFamily:""
	  }
})


export default function Card_Component(props) {
	const navegation = useNavigation();
	const [loading, setLoading] = useState(true);

	function navigateToDetail(receita){
		console.log("Navigate")
        navegation.navigate('Recipe',{receita});
	}

	const renderFooter = () => {
		if (!loading) return null
		return (
		  <View
			style={{
			  paddingVertical: 20,
			  borderTopWidth: 1,
			  borderColor: '#CED0CE'
			}}>
			<ActivityIndicator animating size='large' />
		  </View>
		)
	}

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
						icon="circle-slice-1"
						color="#ff914d"
						size={25}
					/>
					<Text style={styles.recipeInfoColor}>{recipe.rendimento}</Text>
				</View>
			</View>
		  </TouchableOpacity>
		  {setLoading(false)}
		</Card>
	);
	
    return (  
      <>
      {(props.receitas !== undefined) &&
          <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
				showsVerticalScrollIndicator = {false}
				initialNumToRender = {5}
                data={props.receitas}
                keyExtractor={receita => String(receita.id)}
				renderItem={renderItem}
				ListFooterComponent={renderFooter}
            />       
      }
      </>
    )  
}