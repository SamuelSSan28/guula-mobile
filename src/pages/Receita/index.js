import { IconButton, Paragraph } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import { Text, View, StyleSheet, Image, PixelRatio } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
<<<<<<< HEAD
import {useNavigation,useRoute} from '@react-navigation/native'
=======
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react';

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
<<<<<<< HEAD
	const navegation = useNavigation();
    const route = useRoute();
	
	const recipe = route.params.recipe;
    /*let imagem = require('./pizza.png')
    let source = resolveAssetSource(imagem)*/
	
=======

    /*let imagem = require('./pizza.png')
    let source = resolveAssetSource(imagem)*/

>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
    return (
        <>
            <Header_Back />
            <ScrollView style={styles.recipeScroll}>
                {/*<Image
                    style={{
                        width: '100%',
                        height: source.height / PixelRatio.get()
                    }}
<<<<<<< HEAD
                    source= {recipe.imagem}
=======
                    source={imagem}
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
                    resizeMode="contain"
                />*/}
                <View style={styles.recipeView}>
                    <View style={styles.titleAndFavouriteContent}>
<<<<<<< HEAD
                        <Text style={styles.recipeName}> {recipe.titulo}</Text>
=======
                        <Text style={styles.recipeName}>Pizza</Text>
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
                        <IconButton style={styles.recipeFavouriteIcon}
                            icon="heart"
                            color="#d9d9d9"
                            size={30}
                        />
                    </View>
                    <View style={styles.recipeInfo}>
                        <View style={styles.recipeIconsAndInfo}>
                            <IconButton style={styles.recipeIcons}
                                icon="clock-outline"
                                color="#ff914d"
                                size={25}
                            />
<<<<<<< HEAD
                            <Text style={styles.recipeInfoColor}> {recipe.tempo_preparo}</Text>
=======
                            <Text style={styles.recipeInfoColor}>20 Min</Text>
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
                        </View>
                        <View style={styles.recipeIconsAndInfo}>
                            <IconButton style={styles.recipeIcons}
                                icon="circle-slice-1"
                                color="#ff914d"
                                size={25}
                            />
<<<<<<< HEAD
                            <Text style={styles.recipeInfoColor}> {recipe.rendimento}</Text>
=======
                            <Text style={styles.recipeInfoColor}>4 Pessoas</Text>
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
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
<<<<<<< HEAD
                            {recipe.ingredientes}
						</Paragraph>
=======
                            1 kg de farinha de trigo

                            30 g de fermento biológico

                            3 xícaras de água morna

                            3/4 xícaras de óleo

                            1 colher (chá) de sal

                            1 colher (chá) de açúcar

                            1 colher (sopa) de pinga
</Paragraph>
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
                    </View>
                    <View style={styles.recipeTitles}>
                        <Text style={styles.recipeTitleText}>Modo de Preparo</Text>
                    </View>
                    <View>
                        <Paragraph style={styles.recipeInfoColor}>
<<<<<<< HEAD
							{recipe.modo_preparo}
						</Paragraph>
=======
                            Misture o fermento, o sal e o açúcar em um pouco de água morna, até que o fermento esteja completamente dissolvido.

                            Em seguida, adicione metade da medida de farinha de trigo, o óleo e mexa até criar uma consistência pastosa.

                            Acrescente o restante da farinha de trigo, a água morna e misture bem.

                            Assim que a massa desgrudar das mãos, deixe crescer por 30 minutos.

                            Abra os discos, fure a massa com um garfo e pincele o molho.

                            Leve ao forno médio (180° C), preaquecido, por 15 minutos.
</Paragraph>
>>>>>>> b666f6e4e5e8b8975f6db55d5b2675efd877c9d5
                    </View>
                </View>
            </ScrollView>
        </>
    );
}