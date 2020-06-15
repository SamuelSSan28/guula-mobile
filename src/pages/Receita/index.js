import { IconButton, Paragraph } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import { Text, View, StyleSheet, Image, PixelRatio } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {useNavigation,useRoute} from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import UserContext from '../../../providers/UserProvider';
import FavoriteProvider from '../../../providers/FavoriteProvider';
import SnackbarComponent from '../Componentes/Snackbar';


const styles = StyleSheet.create({
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
        justifyContent: 'center',
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
        color: "#545454"
    },
    recipeTitleText: {
        fontSize: 20
    }
})


export default function RecipeScreen() {
	const navegation = useNavigation();
    const route = useRoute();
    const { user } = React.useContext(UserContext);
    const { receitas, setReceitas, totalReceitas, setTotalReceitas } = React.useContext(FavoriteProvider);

    const [heart, setHeart] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('');
	
    const recipe = route.params.receita;
        /*let imagem = require('./pizza.png')
    let source = resolveAssetSource(imagem)*/
    async function handleFavorite(){

        if(!user.loggedIn){
            //usuario não logado
            return
        }

        if(heart){
            setHeart(false);
            await api.delete(`favorites/${recipe.id}`, {
                headers: {
                    authorization: user.id
                }
            }).catch(function(error){

            })
            setTotalReceitas(Number(totalReceitas) - 1)
            setReceitas(receitas.filter(receita => receita.id !== recipe.id))
            setSnackbarContent("Receita removida dos favoritos!")
            setShowSnackbar(true);

        }else{
            setHeart(true);
            await api.post('favorites',{receita_id: recipe.id}, {
                headers: {
                    authorization: user.id
                }
            }).catch(function(error){

            })
            const r = receitas;
            r.push(recipe);
            setReceitas(r);
            setTotalReceitas(Number(totalReceitas) + 1);
            setSnackbarContent("Receita adicionada aos favoritos!")
            setShowSnackbar(true);
        }
    }
    
    useEffect(() => {
        if(receitas.includes(recipe)){
            setHeart(true);
        }
    }, [])
    
    return (
        <>
            <Header_Back />
            <ScrollView style={styles.recipeScroll}>
                {/*<Image
                    style={{
                        width: '100%',
                        height: source.height / PixelRatio.get()
                    }}
                    source= {recipe.imagem}
                    resizeMode="contain"
                />*/}
                <View style={styles.recipeView}>
                    <View style={styles.titleAndFavouriteContent}>
                        <Text style={styles.recipeName}> {recipe.titulo}</Text>
                        <IconButton style={styles.recipeFavouriteIcon}
                            icon="heart"
                            color={heart ? "red" : "#d9d9d9"}
                            size={30}
                            onPress={handleFavorite}
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
                                icon="circle-slice-1"
                                color="#ff914d"
                                size={25}
                            />
                            <Text style={styles.recipeInfoColor}> {recipe.rendimento}</Text>
                        </View>
                        <View style={styles.recipeIconsAndInfo}>
                            <IconButton style={styles.recipeIcons}
                                icon="puzzle-outline"
                                color="#ff914d"
                                size={25}
                            />
                            <Text style={styles.recipeInfoColor}>Fácil</Text>
                        </View>
                    </View>
                    <View style={styles.recipeTitles}>
                        <Text style={styles.recipeTitleText}>Ingredientes </Text>
                    </View>
                    <View>
                        <Paragraph style={styles.recipeInfoColor}>
                            {recipe.ingredientes}
						</Paragraph>
                    </View>
                    <View style={styles.recipeTitles}>
                        <Text style={styles.recipeTitleText}>Modo de Preparo</Text>
                    </View>
                    <View>
                        <Paragraph style={styles.recipeInfoColor}>
							{recipe.modo_preparo}
						</Paragraph>
                    </View>
                </View>
                <SnackbarComponent visible={showSnackbar} setVisible={setShowSnackbar} content={snackbarContent} />
            </ScrollView>
        </>
    );
}