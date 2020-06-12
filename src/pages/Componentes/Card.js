<<<<<<< HEAD
import React, { useState } from 'react';
import { Card, Title, Paragraph,IconButton} from 'react-native-paper';
=======
import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
import {useNavigation,useRoute} from '@react-navigation/native'

import {
	StyleSheet,
<<<<<<< HEAD
	TouchableOpacity, 	
	FlatList, 
	ScrollView,
	View,
	Text} from 'react-native';
import { NavigationEvents } from 'react-navigation';
=======
	TouchableOpacity, 
	FlatList, 
	ScrollView, 
	View,
	Dimensions} from 'react-native';
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5

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
<<<<<<< HEAD
        navegation.navigate('Recipe',{recipe});
	}
	
=======
        navegation.navigate('Receita',{recipe});
    }
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
	
	const renderItem = ({item:recipe}) => (
	  <View>
		 <Card style={{padding: 10,margin:5}} elevation={2} onPress={() => navigateToDetail(recipe)}>
		  <TouchableOpacity>
			<Card.Cover source={{ uri: recipe.imagem}} />
<<<<<<< HEAD
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
=======
			<Card.Content>  
			  <Title>{recipe.titulo}</Title>
			  <Paragraph>{recipe.tempo_preparo}, {recipe.rendimento} </Paragraph>
			</Card.Content>
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
		  </TouchableOpacity>
		</Card>
	  </View>
	);
	
<<<<<<< HEAD
    return (  
=======
    return (   
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
      <>
      {(props.receitas !== undefined) &&
          <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
				showsVerticalScrollIndicator = {false}
                data={props.receitas}
                keyExtractor={receita => String(receita.id)}
<<<<<<< HEAD
				renderItem={renderItem}
=======
                renderItem={renderItem}
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
            />       
      }
      </>
    )  
}