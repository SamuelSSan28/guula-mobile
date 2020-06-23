import { IconButton, Paragraph } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import UserContext from '../../../providers/UserProvider';
import api_users from '../../services/api_users';
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

    const navigation = useNavigation();

    async function favoritarReceita() {
        const data = {
            receita_id: recipe.id
        };

        if (!favoritou) {
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

    const navegation = useNavigation();
    const route = useRoute();
    const { user, setUser } = React.useContext(UserContext);
    const [source, setSource] = useState('');
    const [recipe, setRecipe] = useState(route.params.recipe);
    const { receitas, setReceitas, totalReceitas, setTotalReceitas } = React.useContext(FavoriteProvider);
    const [favoritou, setFavoritou] = useState(receitas.some(e => e.id === recipe.id));
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('');
    
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
                        <Text style={styles.recipeTitleText}>Ingredientes</Text>
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

            </ScrollView>
            { true && <SnackbarComponent visible={showSnackbar} setVisible={setShowSnackbar} content={snackbarContent} />}

        </>
    );
}