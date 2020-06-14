import React, { useState } from 'react';
import { View, StyleSheet, FlatList,Text,TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import { Chip, List, Searchbar,Appbar,Subheading,Divider,Card, Title, Paragraph,IconButton } from 'react-native-paper';
import style from '../Base/styles';
import api from '../../services/api.js'
import Constants from "expo-constants";
import {useNavigation,useRoute} from '@react-navigation/native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 3

    },
	ingredientes_box:{
		margin: 10,
	},
	ingredientes_quant_box:{
		margin: 5,
		alignItems:'center',
	},
	ingredientes_box_text:{
		marginBottom: 5,
		color:"#a6a6a6",
		fontSize:15,
		fontWeight: "bold",
	
	},
	ingredientes_quant_text:{
		color:"#a6a6a6",
		fontSize:16,

	},
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 0,
      marginTop:0
    },
    chip: {
      backgroundColor:"#ff914d",
      margin: 4,

    },
    tiny: {
      color:"#ffff"
    },
    text: {
      textAlign: "center",
      color: "#616161",
      fontSize: 15,
      paddingBottom: 30
    },container: {
      flex: 1, 
        justifyContent: "center",
        backgroundColor:"#fff",
        alignItems: "center",
        padding: 10,
    },
    image:{
      margin:10,
      width: 150,
      height: 150,
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
  },titulo: {
    textAlign: "center",
    color: "#545454",
    fontSize: 19,
    fontWeight:"300",
    fontFamily:""
  }
  
  });


export default function SearchScreeen(){
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  let limpar = "";
  var [ingredientes, setIngredientes] = useState([]);
  const [quantReceitas, setQuantReceitas] = useState(0);
  const [refresh,setRefresh] = useState(false)
  const [recipes, setRecipes] = useState([]);

  const renderItemI = ({item:ingrediente}) => (
    <Chip onPress={() => {}} onClose={() => {_removeIngrediente(ingrediente)}} style={styles.chip} textStyle={styles.tiny}>
         {ingrediente}
    </Chip>
  );
  const navegation = useNavigation();

  function navigateToDetail(receita){
    navegation.navigate('Recipe',{receita});
	}

  const renderHeader= () => {
      if (ingredientes.length  > 0 )
      return (
        <>
        <View  style={styles.ingredientes_box}>
              <Text style={styles.ingredientes_box_text}> Ingredientes: </Text> 
              <View style={styles.row}>
                <FlatList
                showsVerticalScrollIndicator = {false}
                data={ingredientes}
                renderItem={renderItemI}
                extraData={refresh}
                keyExtractor={ingrediente => String(ingrediente)}
                horizontal
                />
            </View>
          </View>
          <Divider />
				
          <View style={styles.ingredientes_quant_box}>
            { (quantReceitas > 0 && ingredientes.length  > 0 ) ? 
                  <>
                    <Text style={styles.ingredientes_quant_text}>{quantReceitas} receitas encontradas</Text> 
                  </>
                  : 
                  <View></View>}
          </View>
       </>
      );
      return(
        <View>
          
        </View>
      );        
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
      <Title  style={styles.titulo}>{recipe.titulo}</Title>
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
	


  async function _onPressSearch(){
    if(searchQuery == '' || ingredientes.indexOf(searchQuery) != -1)
      return false
    ingredientes.push(searchQuery)   
    _SearchRecipe()
    setSearchQuery("")
    setRefresh(!refresh)
  }
  
  async function _removeIngrediente(ingrediente){
    var index = ingredientes.indexOf(ingrediente);
    if (index != -1) ingredientes.splice(index, 1);
    _SearchRecipe()
    setQuantReceitas(quantReceitas - 1)
  }

  async function _SearchRecipe(){
    var lista_ingredientes = "";

    if (ingredientes.length== 0)
      return "Sem receitas pra vc meu consagrado"

    for(var i = 0; i < ingredientes.length; i++){
      lista_ingredientes += ingredientes[i]+" "
    }
    const res = await api.get("recipes/ingredientes",{ 'headers': { 'ingredientes': lista_ingredientes }   });
    setRecipes(res.data);
    setQuantReceitas(res.headers.total_receitas_by_ingredientes)
    setLoading(false)
  }

    return (    
      <>
        <Appbar.Header style={style.header}>
          <Searchbar
          style={
            { flexDirection: 'row-reverse',}
          }
          placeholder="Search"
          onChangeText={setSearchQuery}
          onIconPress={_onPressSearch}
          iconColor="#ff914d"
          value={searchQuery}
            />
        </Appbar.Header>

        {(quantReceitas > 0 && ingredientes.length  > 0 ) ?  
             <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator = {false}
                data={recipes}
                keyExtractor={receita => String(receita.id)}
                renderItem={renderItem}
                initialNumToRender = {5}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={renderHeader}
                   />       
              : <View style={styles.container}>
                  <Image style={styles.image}
                             source={require('../assets/ingredientes.png')} />
                  <Text  style={styles.text}>Pesquise os ingredientes que voce tem ai do seu ladinho, em cima dessa pia de marmore</Text>
                </View>}

          
      </>
    ); 
  
}
