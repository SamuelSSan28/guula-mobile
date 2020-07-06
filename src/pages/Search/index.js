import React, { useState,useEffect } from 'react';
import { View, FlatList,Text,TouchableOpacity, ActivityIndicator,Image,TouchableWithoutFeedback,Alert,Keyboard } from 'react-native';
import { Chip, Searchbar,Appbar,Divider,Card, Title, Paragraph,IconButton } from 'react-native-paper';
import style from '../Base/styles';
import styles from './styles';
import api from '../../services/api.js'
import {useNavigation,useRoute} from '@react-navigation/native'

export default function SearchScreeen(){
  var  [ingredientesAux, setIngredientesAux] = useState([]);
  var query = ""
  const [errorInternet, setErrorInternet] = useState(false);
  const flatListRef = React.useRef()
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [quantReceitas, setQuantReceitas] = useState(0);
  const [refresh,setRefresh] = useState(false)
  const [recipes, setRecipes] = useState([]);
  const [count_touch, setCount_touch] = useState(0);
  const encoding = {"ã":"2", "ç":"3","õ":"4","á":"5","é":"6","í":"7","ó":"8","ú":"9",
                    "â":"10","ê":"11","î":"12","ô":"13","û":"14",
                    }
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

  function navigateToDetail(recipe){
    navegation.navigate('Recipe',{recipe});
  }
  
  function show_alert(){
    setCount_touch(parseInt(count_touch) + 1);
  

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
            { (quantReceitas > 0 && ingredientes.length  > 0 && ! errorInternet) ? 
                  <>
                    <Text style={styles.ingredientes_quant_text}>{quantReceitas} receitas encontradas</Text> 
                  </>
                  : 
                  !(refresh) ?
                  <View>
                    <Text style={{color:"#626262",fontSize: 20,fontFamily: 'Poppins_700Bold',textAlign:"center"} }> :(</Text> 
                    <Text style={styles.ingredientes_quant_text}> 0 receitas encontradas</Text> 
                  </View>
                  :<View></View>  
                }

          </View>

          {(refresh == true) ?
                <ActivityIndicator animating size='large' color="#ff914d"/> 
            :  <View></View> } 

          {(errorInternet == true) ?
                <View>
                <Text style={{color:"#626262",fontSize: 20,fontFamily: 'Poppins_700Bold',textAlign:"center"} }> :(  </Text> 
                <Text style={styles.ingredientes_quant_text}> Sem Inteernet</Text> 
              </View> 
            
            :  <View></View> } 

       </>
      );
      return(
        <View>
          
        </View>
      );        
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
 
 const renderItem_Vazio = () => (
  <View>
    
  </View>
);

useEffect(() => {
  Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

  // cleanup function
  return () => {
    Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
  };
}, [searchQuery]);

const _keyboardDidHide = () => {
  //console.log("Keboard Abaixou")
  _onPressSearch()
};


async function _onPressSearch(){   
    if(searchQuery == '' || ingredientes.indexOf(searchQuery) != -1 || ingredientesAux.indexOf(searchQuery) != -1)
      return false 
    
    setRefresh(true)
    setIngredientes([...ingredientes,searchQuery])
    setSearchQuery("")
    ingredientesAux.push(searchQuery)

    //console.log(ingredientes)
    //console.log(ingredientesAux)

     _SearchRecipe()
    if(ingredientes.length > 1)
      toTop()
  }
  
  async function _removeIngrediente(ingrediente){
    console.log("REMOVE: ")
    
    const result = ingredientes.filter(item => item !== ingrediente)

    var index = ingredientesAux.indexOf(ingrediente);
    if (index != -1) ingredientesAux.splice(index, 1);
    
    //console.log(ingredientes)

    if(ingredientes.length > 0 &&  ingredientesAux.length > 0 ){
      _SearchRecipe()
    }
    else{
      setQuantReceitas(0)
    }
    setIngredientes(result)
    

  }

  async function _SearchRecipe(){
  
    var lista_ingredientes = "";

    setRefresh(true)
    for(var i = 0; i < ingredientesAux.length; i++){
      var ingrid = ""
      for(var j = 0; j < ingredientesAux[i].length; j++){
        if(Object.keys(encoding).includes(ingredientesAux[i][j])){
          ingrid += encoding[ingredientesAux[i][j]]
        }
        else{
          ingrid += ingredientesAux[i][j]
        }
      }
      lista_ingredientes += ingrid+" "
    }
    
    console.log(lista_ingredientes)
    const res = await api.get("recipes/ingredientes",{ 
      'headers': 
          { 'ingredientes': lista_ingredientes,
          'Content-Type': 'application/json;charset=UTF-8'
        }
        })
    .then(response => {
      if (response.headers.total_receitas_by_ingrediente == 0){
        setRefresh(false)
        return "Sem receitas pra vc meu consagrado"
        
      }
      console.log(response.headers  )
      setErrorInternet(false)
      setRefresh(false)

      setRecipes(response.data);
      setQuantReceitas(response.headers.total_receitas_by_ingredientes)
      setRefresh(false)
    })
    .catch(function (err) {
      if (err.message === "Network Error"){
        setErrorInternet(true)
        return "Sem Intrnet";
      }
    });;

    
  }

  return (    
      <>
        <Appbar.Header style={style.header}>
          <Searchbar
          style={
            { flexDirection: 'row-reverse',}
          }
          placeholder="Pesquise seus ingredientes"
          onChangeText={setSearchQuery}
          onIconPress={_onPressSearch}
          iconColor="#ff914d"
          value={searchQuery}
            />
        </Appbar.Header>

        {(ingredientes.length  > 0 ) ?  
             <FlatList
                style={{ marginTop: 8 }}
                ref={flatListRef}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator = {false}
                data={recipes}
                keyExtractor={receita => String(receita.id)}
                renderItem={(quantReceitas  > 0 ) ? renderItem: renderItem_Vazio}
                initialNumToRender = {5}
                ListHeaderComponent={renderHeader}
                   />    
                      
              :  <View style={styles.container}>
                     <TouchableWithoutFeedback onPress={show_alert}> 
                       <Image style={styles.image}
                                 source={require('../assets/ingredientes.png')} />
                     </TouchableWithoutFeedback>
                     <Text  style={styles.text}>Encontre receitas de acordo com o que você tem em casa</Text>
   
                   </View>}
          
      </>
    ); 
  
}
