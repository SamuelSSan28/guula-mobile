import { IconButton, Paragraph,Checkbox,List } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import { Text, View, StyleSheet, Image, Alert,TouchableRipple } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import UserContext from '../../../providers/UserProvider';
import api_users from '../../services/api_users';
import FavoriteProvider from '../../../providers/FavoriteProvider';
import SnackbarComponent from '../Componentes/Snackbar';
import CheckboxList from "rn-checkbox-list";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 8,
      },
      row2: {
        flexDirection: 'row',
      },
      textCheck:{
        flex: 1, 
        flexWrap: 'wrap',
        fontSize: 18,
        marginLeft: 5
      },
    titleAndFavouriteContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    recipeName: {
        fontSize: 30,
        padding: 0,
        margin: 0,
        width: '75%'
    },
    recipeFavouriteIcon: {
        padding: 0,
        margin: 0
    },
    recipeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    recipeTitles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10
    },
    recipeScroll: {
        flex: 1
    },
    recipeView: {
        padding: 10
    },
    recipeIcons: {
        margin: 0,
        padding: 0
    },
    recipeIconsAndInfo: {
        alignItems: 'center'
    },
    recipeInfoColor: {
        color: "#545454",
        fontFamily: 'Poppins_400Regular'
    },
    recipeTitleText: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold'
    }
})


export default function RecipeScreen() {
    const [checked, setChecked] = useState({});
    const [refresh, setRefresh] = useState(false);
    const navigation = useNavigation();

    async function favoritarReceita() {
        const data = {
            receita_id: recipe.id
        };

        if (!favoritou) {
            console.log("ok");
            const response = await api_users.post('favorites', data, {
                headers: {
                    Authorization: user.id,
                }
            })
                .catch(function (error) {
                    Alert.alert(error)
                });
            if (response.status == 200) {
                setReceitas([...receitas, ...[recipe]]);
                setTotalReceitas(Number(totalReceitas)+1);
                setSnackbarContent("Receita adicionada aos favoritos!")
                setShowSnackbar(true);
                setFavoritou(true);
            }
        }
        else {
            const response = await api_users.delete('favorites/' + recipe.id, {
                headers: {
                    Authorization: user.id,
                }
            })
                .catch(function (error) {
                    Alert.alert(error)
                });
            if (response.status == 204) {
                setReceitas(receitas.filter(e => e.id != recipe.id));
                setTotalReceitas(Number(totalReceitas)-1);
                setSnackbarContent("Receita removida dos favoritos!")
                setShowSnackbar(true);
                setFavoritou(false);
            }
        }
    }
    

    function setCheck(ingrediente){
        let aux = checked;
        aux[ingrediente]  = !aux[ingrediente]
        setChecked(aux)
        console.log(checked)
    }


    function renderIgredientes(ingredientes){
        var indice = 0;

        var lista = ingredientes.split("\n");
        
        var lista_dict = []

        for(let i = 0; i < lista.length; i++){
            if(lista[i] == "" || lista[i] == " ")
                indice = i
            else{
                lista_dict.push({id:i,name:lista[i]})
            }
        }

        return (
            <CheckboxList
                theme="orange"
                listItems={lista_dict}
                listItemStyle={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}
                
/>

        )
    }

    function renderPreparo(Preparo){
        var indice = 0;

        var lista = Preparo.split("\n")
        
        for(let i = 0; i < lista.length; i++){

            if(lista[i].includes("Gostou" ) || lista[i].includes("gostou")|| lista[i].includes("Procurando") ){
                if (indice == 0)
                    indice = i
               
            }
                
        }
        //0, 1,2,3,4,5,6,7,8

        lista.splice(indice,lista.length - indice);

        const listPreparo = lista.map((prep) =>
                <View style={styles.row2} >
                    <Text>{prep}  </Text>
                </View>
                        
        );
                        
        return listPreparo
    }

    const navegation = useNavigation();
    const route = useRoute();
    const { user, setUser } = React.useContext(UserContext);
    const [source, setSource] = useState('');
    const [recipe, setRecipe] = useState(route.params.recipe);
    const { receitas, setReceitas, totalReceitas, setTotalReceitas } = React.useContext(FavoriteProvider);
    const [favoritou, setFavoritou] = useState(receitas.some(e => e.id === recipe.id));
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('');
    const dificuldade = {"Dificuldade elevada":"Dificil", "Dificuldade média":"Média", "Dificuldade baixa":"Fácil"   }
    Image.getSize(recipe.imagem, (width, height) => { setSource({ width: width, height: height }); });
    
    return (
        <>
            <Header_Back />
            <ScrollView style={styles.recipeScroll}>
                <Image source={{ uri: recipe.imagem }} style={{ aspectRatio: source ? source.width / source.height : 1, width: '100%', height: null }} resizeMode='contain' />
                <View style={styles.recipeView}>
                    <View style={styles.titleAndFavouriteContent}>
                        <Text style={styles.recipeName}> {recipe.titulo}</Text>
                        <IconButton style={styles.recipeFavouriteIcon}
                            icon="heart"
                            color={favoritou ? "red" : "#d9d9d9"}
                            size={30}
                            animated={true}
                            onPress={() => {
                                user.loggedIn ? favoritarReceita() : Alert.alert(
                                    'Atenção',
                                    'É preciso estar logado para favoritar suas receitas!',
                                    null,
                                    { cancelable: false }
                                );
                            }}
                        />
                    </View>
                    <View style={styles.recipeInfo}>
                        <View style={styles.recipeIconsAndInfo}>
                            <IconButton style={styles.recipeIcons}
                                icon="clock-outline"
                                color="#ff914d"
                                size={25}
                            />
                            <Text style={styles.recipeInfoColor}> {recipe.tempo_preparo}</Text>
                        </View>
                        <View style={styles.recipeIconsAndInfo}>
                            <IconButton style={styles.recipeIcons}
                                icon="silverware"
                                color="#ff914d"
                                size={25}
                            />
                            <Text style={styles.recipeInfoColor}> {recipe.rendimento}</Text>
                        </View>
                        <View style={styles.recipeIconsAndInfo}>
                            <IconButton style={styles.recipeIcons}
                                icon="poll"
                                color="#ff914d"
                                size={25}
                            />
                            <Text style={styles.recipeInfoColor}>{dificuldade[recipe.dificuldade]}</Text>
                        </View>
                    </View>
                    <View style={styles.recipeTitles}>
                        <IconButton style={styles.recipeIcons}
                                icon="chef-hat"
                                color="#ff914d"
                                size={25}
                            />
                        <Text style={styles.recipeTitleText}> Ingredientes</Text>
                    </View>
                    <View>
                        <Paragraph style={styles.recipeInfoColor}/>

                        {renderIgredientes(recipe.ingredientes)}
                    </View>
                    <View style={styles.recipeTitles}>
                        <Text style={styles.recipeTitleText}>Modo de Preparo</Text>
                    </View>
                    <View>
                        <Paragraph style={styles.recipeInfoColor} / >
                        {renderPreparo(recipe.modo_preparo)}

                    </View>
                </View>

            </ScrollView>
         { true && <SnackbarComponent visible={showSnackbar} setVisible={setShowSnackbar} content={snackbarContent} />}

        </>
    );
}