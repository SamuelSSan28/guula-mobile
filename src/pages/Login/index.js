import React from 'react';
import { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {useNavigation,useRoute} from '@react-navigation/native'
import api from '../../services/api.js'
import { Appbar } from 'react-native-paper';
import Menu_header from '../Componentes/Menu';

import {
    ScrollView,
    View,
    Image,
    Dimensions,
    StyleSheet,
    Platform,
    Text,

  } from 'react-native';
import  MyBottomNavigation  from '../Componentes/BottomNavigation.js';


export default function Incidents(){
    
    return(
        <View>
            <Appbar.Header style={styles.header}>
            <Image source={logoImg}/>
            <Menu_header/>
            
        </Appbar.Header>

        <MyBottomNavigation/>
      
        </View>
        
        
    )
}