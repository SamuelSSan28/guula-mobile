import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles';
import {useNavigation,useRoute} from '@react-navigation/native'
import api from '../../services/api.js'
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
    <ScrollView>
      <Card_Component />
      <Card_Component />
      <Card_Component />
    </ScrollView>
  );
// ----------Gambiarra pro flatlist----------

export default function HomeScreen(){
    return(
            <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={styles.content}
                renderItem={renderItem}
                data={state.data}
            />        
    )
}