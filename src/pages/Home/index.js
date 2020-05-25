import React from 'react';
import { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {useNavigation,useRoute} from '@react-navigation/native'
import api from '../../services/api.js'
import { Appbar } from 'react-native-paper';
import Menu_header from '../Componentes/Menu.js';
import  BottomMenu  from '../Componentes/BottomNavigation.js';
import  Card_Component  from '../Componentes/Card.js';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
/*
const get_Receitas_Home = api.get('/recipes').then(function (response) {
    console.log(response.headers);
  })*/

// ----------Gambiarra pro flatlist----------
const state = {
    data: [
      { id: 0, full_name: 'Repo 1' },
    ],
  };

const renderItem = ({item }) => (
    <View >
      <Card_Component />
      <Card_Component />
      <Card_Component />
    </View>
  );
// ----------Gambiarra pro flatlist----------

export default function Incidents(){
    return(
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Image source={logoImg}/>
                <Menu_header/> 
            </Appbar.Header>
        
            <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
                renderItem={renderItem}
                data={state.data}
            />


        <View style={styles.content}>           
            
            
           
        </View>
        
        <View style={styles.bottomMenu}>
            <BottomMenu />
            
        </View>
        
        
        </View>
        
        
    )
}