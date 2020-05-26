import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles';
import {useNavigation,useRoute} from '@react-navigation/native'
import api from '../../services/api.js'
import  Card_Component  from '../Componentes/Card.js';
import {
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import {Card, Title, Paragraph } from 'react-native-paper';


export default function HomeScreen(){
  const [recipes, setRecipes] = useState([]);

  async function loadRecipes(){
    const res = await api.get("recipes/random/8");
    setRecipes(res.data);
  }
  useEffect( () => {loadRecipes()}, []);


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

  /*  
    function navigateToDetail(incident){
        navegation.navigate('Detail',{incident});
    }
    Passar os dados das receitas para a rota de receitas
    */

  return(
            <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
                data={recipes}
                keyExtractor={receita => String(receita.id)}
                renderItem={renderItem}
            />        
    )
}