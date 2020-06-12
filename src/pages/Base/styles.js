import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { Dimensions} from 'react-native';

export default StyleSheet.create({

    container:{
        flex: 1,    
        justifyContent: 'space-between',
    },

    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#ff914d',
        fontFamily: 'sans-serif-light',
        margin:0
    },   
    bottomMenu:{
        fontFamily: 'sans-serif-light',
        flexDirection: 'row' 
    },

    content:{
        justifyContent: 'flex-start',
        padding: 0
    },

    card:{
        padding: 5
    }
    

});