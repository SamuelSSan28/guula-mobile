import React from 'react';
import { Text, View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Header_Base from '../Componentes/Header_Base';
import Header_Back from '../Componentes/Header_Back'
import Base from '../Base/index';

export default function About() {
    const navigation = useNavigation();
    return (
        <>
        <Appbar.Header style={styles.header}>
        <Appbar.BackAction color='#ffffff' onPress={() => navigation.goBack()} />
        <View>
            <Text style = {styles.text_header}>
                About
            </Text>
        </View>
        </Appbar.Header>
        
        <View style = {styles.version_bar}>
            <Text style = {styles.text_version_bar}>
                Guula App
            </Text>
            <Text style = {styles.text_version_bar}>
                Versão: 1.0
            </Text>
        </View>

        <View style = {styles.content}>
            <Text style = {styles.text_content}>
            Guula é um aplicativo desenvolvido com o propósito de sugerir receitas maravilhosas de acordo com os ingredientes que o usuário possui. 
            Com mais de 5 mil receitas, o aplicativo fornece opções para todos os gostos. Além de informações básicas como lista de ingredientes e 
            modo de preparo, cada receita é acompanhada de uma foto e grau de dificuldade.
            </Text>
        </View>
        <Base>
        
        </Base>
        </>
    )

}