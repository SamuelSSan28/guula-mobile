import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {useNavigation,useRoute} from '@react-navigation/native'

import {
	StyleSheet,
	TouchableOpacity, 
	FlatList, 
	ScrollView, 
	View,
	Dimensions} from 'react-native';

const styles = StyleSheet.create({
  content:{
    justifyContent: 'flex-start',
    padding: 0
},
})



export default function Card_Component(props) {
	const navegation = useNavigation();
	
	function navigateToDetail(recipe){
        navegation.navigate('Receita',{recipe});
    }
	
	const renderItem = ({item:recipe}) => (
	  <View>
		 <Card style={{padding: 10,margin:5}} elevation={2} onPress={() => navigateToDetail(recipe)}>
		  <TouchableOpacity>
			<Card.Cover source={{ uri: recipe.imagem}} />
			<Card.Content>  
			  <Title>{recipe.titulo}</Title>
			  <Paragraph>{recipe.tempo_preparo}, {recipe.rendimento} </Paragraph>
			</Card.Content>
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