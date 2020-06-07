import * as React from 'react';
import LoginScreen from '../Login';
import api from '../../services/api';
import styles from './styles';
import Card_Component from '../Componentes/Card';
import UserContext from '../../../providers/UserProvider';
import {
    View,
    Text,
    AsyncStorage //armazenar dados dos usuario (id, nome)
} from 'react-native';
import Header_Base from '../Componentes/Header_Base';

export default function FavoriteScreen() {

    const [receitas, setReceitas] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const {user, setUser} = React.useContext(UserContext);

    async function onRefresh(){
        //clear
       await loadRecipes();
    }

    async function loadRecipes() {
        if (loading) {
            return;
        }

        if (total > 0 && receitas.length === total) {
            return;
        }

        setLoading(true);
        const response = await api.get('favorites', {
            headers: {
                Authorization: user.id,
            }
        })
            .catch(function (error) {
                setError(error)
            });
        
        setReceitas(response.data);
        setTotal(response.headers.total_receitas_favoritas);
        setLoading(false);
    }

    React.useEffect(() => {
        loadRecipes();
    }, [user])

    return (
        <>
        <Header_Base/>
            {!user.loggedIn ?
            <>
                <LoginScreen setIsSignIn={setUser}/>
            </>
                : <>
            <View style={styles.container}>
                {/**<Text style={styles.usuario}>{`Usuario: ${userId}`}</Text>*/}
                <View style={styles.total}>
                <Text style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor:'black',
                    margin:10,
                }}>{total} {(total === '1') ? "receita" : "receitas"}</Text>                
                </View>
                <Card_Component receitas={receitas} onRefresh={onRefresh}/>
            </View>        
                </>}
        </>
    )
}