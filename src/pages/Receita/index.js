import { IconButton, Paragraph } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import { Text, View, StyleSheet, Image, PixelRatio } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {useNavigation,useRoute} from '@react-navigation/native'
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
	const navegation = useNavigation();
    const route = useRoute();
	
    const recipe = route.params.receita;
    
    console.log(recipe)
    /*let imagem = require('./pizza.png')
    let source = resolveAssetSource(imagem)*/
	
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
            </ScrollView>
        </>
    );
}