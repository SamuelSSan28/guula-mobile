import {StyleSheet} from 'react-native';
import { block } from 'react-native-reanimated';

export default StyleSheet.create({
    header:{
        display: 'flex',
        flexDirection:'row',
        backgroundColor: '#ff914d',
        fontFamily: 'sans-serif-light',
    },
    text_header:{
        fontSize: 24,
        color: '#ffffff',
        marginLeft: 120,
    },
    version_bar:{
        padding: 32,
        backgroundColor: '#f8f4f4',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text_version_bar:{
        color:'#ff914d',
        fontSize: 22
    },
    content:{
        paddingBottom: 500,
        backgroundColor: '#ffffff',
    },
    text_content:{
        color: '#000000',
        fontSize: 22,
        margin: 22
    }
});