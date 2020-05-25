import React from 'react';
import { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {useNavigation,useRoute} from '@react-navigation/native'
import api from '../../services/api.js'
import { Appbar } from 'react-native-paper';
import Menu_header from '../Componentes/Menu.js';
import  BottomMenu  from '../Componentes/BottomNavigation.js';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    StyleSheet,
    Platform,
    Text,

  } from 'react-native';

export default function Incidents(){
    return(
        <View>
            <Appbar.Header style={styles.header}>
                <Image source={logoImg}/>
                <Menu_header/> 
            </Appbar.Header>
        <View>
            {
            /*
                    Conteúdo
            */
            }
        </View>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
                
            }}>
            <BottomMenu/>
        </View>
        
        
        </View>
        
        
    )
}