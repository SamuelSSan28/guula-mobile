import * as React from 'react';
import LoginScreen from '../Login';
import api from '../../services/api';
import styles from './styles';
import Card_Component from '../Componentes/Card';
import UserContext from '../../../providers/UserProvider';
import FavoriteProvider from '../../../providers/FavoriteProvider';
import Alert from '../Componentes/Alert';
import {
    View,
    Text,
    Image,
} from 'react-native';
import Header_Base from '../Componentes/Header_Base';
import { ActivityIndicator } from 'react-native-paper';

export default function FavoriteScreen() {

    const [loading, setLoading] = React.useState(false);//implementar no provider
    const [error, setError] = React.useState(null);

    const {user, setUser} = React.useContext(UserContext);
    const {receitas, totalReceitas} = React.useContext(FavoriteProvider);

    function onRefresh(){
        //recarregar
    }

    return (
        <>
        <Header_Base/>
            {!user.loggedIn ?
            <>
                <LoginScreen setIsSignIn={setUser}/>
            </>
                : <>
                {/**<Text style={styles.usuario}>{`Usuario: ${userId}`}</Text>*/}
                
                { loading ? <View style={{flex: 1, justifyContent: "center"}}><ActivityIndicator size="large" color="#ff914d"/></View> : totalReceitas === '0' ? 
                <>
                <View style={{
                    flex: 1, 
                    justifyContent: "center",
                    backgroundColor:"#fff",
                    alignItems: "center",
                    padding: 20,
                }}>
                    <Image style={{
                        width: 150,
                        height: 150,
                    }}
                    source={require('../../assets/book.png')}/>
                    <Text style={{
                        textAlign:"center",
                        fontSize: 18,
                        color: "#595959",
                        paddingTop: 30,
                        fontFamily:'Poppins_400Regular',
                        
                    }}>Favorite receitas para guardá-las para mais tarde. Nós vamos matê-las aqui para você!</Text>
                </View>
                </> 
                : 
                <>
                <View style={styles.total}>
                <Text style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor:'black',
                    margin:10,
                }}>{totalReceitas} {(totalReceitas === '1') ? "receita" : "receitas"}</Text>                
                </View>
                <Card_Component receitas={receitas} onRefresh={onRefresh}/>
                </>
                }
                </>}
                {error && <Alert content={error} setShowAlert={setError}/>}
        </>
    )
}