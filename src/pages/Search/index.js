import React, { useState,useEffect } from 'react';
import { View, StyleSheet, FlatList,Text,TouchableOpacity, ActivityIndicator,Image,TouchableWithoutFeedback,Alert } from 'react-native';
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
      color: "#595959",
      fontFamily:'Poppins_400Regular',
      fontSize: 18,
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
  const flatListRef = React.useRef()
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  var [ingredientes, setIngredientes] = useState([]);
  const [quantReceitas, setQuantReceitas] = useState(1);
  const [refresh,setRefresh] = useState(false)
  const [recipes, setRecipes] = useState([]);
  const [count_touch, setCount_touch] = useState(0);

  const frases = ["A vida é como cozinhar: antes de escolher o que gosta, prove um pouco de tudo",
                  "Adorar cozinhar infelizmente não é sinônimo de adorar a obrigação de lavar uma interminável pilha de panelas sujas",
                  "Amadurecimento é quando você perde o medo de fazer feijão.",
                  "Quem nunca foi levar o prato sujo pra cozinha e foi parar no banheiro ?",
                  "Case com uma pessoa que saiba cozinhar. A beleza acaba, a fome não!",
                  "Se está ruim pra você, imagina pra quem só lembrou de colocar sal no arroz, depois que ele secou.",
                  "Aquela comida que sempre tem: Patê.",
                  "Aquela comida que é bem observada: Pavê.",
                  "A vida é como tentar cortar um bife duro com talher de plástico em uma marmita de isopor.",
                  "Chuva é a perfeita camuflagem para fritar batata na madrugada as escondidas.",
                  "Você sabia que comida japonesa no Japão se chama comida daqui mesmo?",
                  "Hoje o meu almoço vai ser comida francesa: Restodeontê.  ",
                  "Mãe, tem algo doce para comer? Tem açúcar!",
                  "Comer é bom, pena que suja prato.",
                  "Se nada funcionar, tente um pedaço de bolo de chocolate!",
                  "Aquela vontade de comer alguma coisa que não sei o que é, mas que com certeza não tenho em casa."
                  ]

  const renderItemI = ({item:ingrediente}) => (
    <Chip onPress={() => {}} onClose={() => {_removeIngrediente(ingrediente)}} style={styles.chip} textStyle={styles.tiny}>
         {ingrediente}
    </Chip>
  );

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  const navegation = useNavigation();

  function navigateToDetail(receita){
    navegation.navigate('Recipe',{receita});
  }
  
  function show_alert(){
    setCount_touch(parseInt(count_touch) + 1);
    console.log(count_touch)

    if (parseInt(count_touch) ==  20){
      var random_id = Math.floor((Math.random() * 16))
      Alert.alert(
        "Uma mensagem pra voce:",
        frases[random_id],
        [
          { text: 'OK', onPress: () => (setCount_touch(parseInt(1))) }
        ],
        { cancelable: false }
      );
    
    }
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
	


   function _onPressSearch(){
    if(searchQuery == '' || ingredientes.indexOf(searchQuery) != -1)
      return false
    ingredientes.push(searchQuery)   
    _SearchRecipe()
    setSearchQuery("")
    setRefresh(!refresh)
    toTop()
  }
  
  function _removeIngrediente(ingrediente){
    var index = ingredientes.indexOf(ingrediente);
    if (index != -1) ingredientes.splice(index, 1);
    _SearchRecipe()
    setQuantReceitas(quantReceitas - 1)
  }

  function onChangeText_Search(){}

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

  useEffect( () => {_SearchRecipe()}, []);

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
                ref={flatListRef}
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
                  <TouchableWithoutFeedback onPress={show_alert}> 
                    <Image style={styles.image}
                              source={require('../assets/ingredientes.png')} />
                  </TouchableWithoutFeedback>
                  <Text  style={styles.text}>Pesquisa aí pow .</Text>

                </View>}

          
      </>
    ); 
  
}
