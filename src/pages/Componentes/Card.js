import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet,TouchableOpacity, FlatList, ScrollView} from 'react-native';


const styles = StyleSheet.create({
  content:{
    justifyContent: 'flex-start',
    padding: 0
},
})

const renderItem = ({item:recipe}) => (
  <ScrollView>
     <Card style={{padding: 10,margin:5}} elevation={2}>
      <TouchableOpacity>
        <Card.Cover source={{ uri: recipe.imagem}} />
        <Card.Content>  
          <Title>{recipe.titulo}</Title>
          <Paragraph>{recipe.tempo_preparo}, `{recipe.rendimento}` </Paragraph>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  </ScrollView>
);


export default function Card_Component(props) {
    return (   
      <>
      {(props.receitas !== undefined) &&
      <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
                data={props.receitas}
                keyExtractor={receita => String(receita.id)}
                renderItem={renderItem}
            />        
      }
      </>
    )  
}
