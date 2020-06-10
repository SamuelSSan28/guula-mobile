import * as React from 'react';
import LoginScreen from '../Login';
import styles from './styles';
import Card_Component from '../Componentes/Card';
import UserContext from '../../../providers/UserProvider';
import FavoriteProvider from '../../../providers/FavoriteProvider';
import Alert from '../Componentes/Alert';
import { View, Text, Image } from 'react-native';
import Header_Base from '../Componentes/Header_Base';
import { ActivityIndicator } from 'react-native-paper';
import api from '../../services/api';

export default function FavoriteScreen() {

    const [loading, setLoading] = React.useState(false);//implementar no provider
    const [error, setError] = React.useState(null);

    const [totalReceitas, setTotalReceitas] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const { user, setUser } = React.useContext(UserContext);
    const { receitas, setReceitas } = React.useContext(FavoriteProvider);

    function onRefresh() {
        loadRecipes();
    }

    async function loadRecipes(){
        const response = await api.get(`favorites?page=${page}`, {
          headers: {
            Authorization: user.id,
          }
        })
          .catch(function (error) {
            setError(error)
          });
    
        setReceitas([...receitas, ...response.data]);
        setTotalReceitas(response.headers.total_receitas_favoritas);
        setPage(page + 1);
      }

      React.useEffect(() => {
          loadRecipes();
      }, [user])

      
    return (
        <>
            <Header_Base />
            {!user.loggedIn ?
                <>
                    <LoginScreen setIsSignIn={setUser} />
                </>
                : <>
                    {/**<Text style={styles.usuario}>{`Usuario: ${userId}`}</Text>*/}

                    {loading ? <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size="large" color="#ff914d" /></View> : totalReceitas === '0' ?
                        <>
                            <View style={styles.contentView}>
                                <Image style={styles.image}
                                    source={require('../../assets/book.png')} />
                                <Text style={styles.centerText}>Favorite receitas para guardá-las para mais tarde. Nós vamos matê-las aqui para você!</Text>
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.totalView}>
                                <Text style={styles.totalText}>{totalReceitas} {(totalReceitas === '1') ? "receita" : "receitas"}</Text>
                            </View>
                            <Card_Component receitas={receitas} func={loadRecipes} onRefresh={onRefresh} />
                        </>
                    }
                </>}
            {error && <Alert content={error} setShowAlert={setError} />}
        </>
    )
}