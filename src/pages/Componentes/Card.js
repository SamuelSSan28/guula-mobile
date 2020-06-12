import React, { useState } from 'react';
import { Card, Title, Paragraph,IconButton} from 'react-native-paper';
import {useNavigation,useRoute} from '@react-navigation/native'

import {
	StyleSheet,
	TouchableOpacity, 	
	FlatList, 
	ScrollView,
	View,
	Text} from 'react-native';
import { NavigationEvents } from 'react-navigation';

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
})



export default function Card_Component(props) {
	const navegation = useNavigation();
	
	function navigateToDetail(recipe){
        navegation.navigate('Recipe',{recipe});
	}
	
	
	const renderItem = ({item:recipe}) => (
	  <View>
		 <Card style={{padding: 10,margin:5}} elevation={2} onPress={() => navigateToDetail(recipe)}>
		  <TouchableOpacity>
			<Card.Cover source={{ uri: recipe.imagem}} />
			<View>  
			  <Title>{recipe.titulo}</Title>
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
		</Card>
	  </View>
	);
	
    return (  
      <>
      {(props.receitas !== undefined) &&
          <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
				showsVerticalScrollIndicator = {false}
                data={props.receitas}
                keyExtractor={receita => String(receita.id)}
				renderItem={renderItem}
            />       
      }
      </>
    )  
}
