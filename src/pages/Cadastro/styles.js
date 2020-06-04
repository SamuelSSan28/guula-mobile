import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { Dimensions} from 'react-native';

export default StyleSheet.create({

    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#ff914d'
    },   

    titulo:{
        fontSize:30,
        marginBottom:16,
        marginTop:48,
        color:'#13131a',
        fontWeight: 'bold'
    },

    descricao:{
        fontSize:16,
        lineHeight: 24,
        color: '#737380'
    },

    incident:{
       padding:24,
       borderRadius:8,
       backgroundColor:'#FFF',
       marginBottom:16, 
       marginTop: 48,
    },
    incidentProperty:{
        fontSize:14,
        color:'#41414d',
        marginTop: 42,
        fontWeight: 'bold'
    },
    
    incidentValue:{
        marginTop: 4,
        marginBottom: 12,
        fontSize: 15,
        color: '#737380'
    },
    contactBox:{
        padding:24,
        borderRadius:8,
        backgroundColor:'#FFF',
        marginBottom:20, 
        marginTop: 15,
     },

    heroTitle:{
         fontWeight:'bold',
         fontSize: 20,
         color:'#13131a',
         lineHeight:30
    },

    heroDescription:{
        fontSize:15,
        color:'#737380',
        marginTop:16
    },

    actions:{
        marginTop: 16,
        flexDirection:'row',
        justifyContent: 'space-between'
    },

    action:{
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    actionText:{
        color:'#FFF',
        fontSize:15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    photo: {
        flex: 1,
        resizeMode: 'cover',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
    },
    item: {
        height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
      }

    

});