import * as React from 'react';
import LoginScreen from '../Login';
import styles from './styles';
import Card_Component from '../Componentes/Card';
import UserContext from '../../../providers/UserProvider';
import FavoriteProvider from '../../../providers/FavoriteProvider';
import Alert from '../Componentes/Alert';
import { View, Text, Image } from 'react-native';
import Header_Base from '../Componentes/Header_Base';
import { ActivityIndicator, Divider,Appbar } from 'react-native-paper';
import api_users from '../../services/api_users';
import styles_header from '../Base/styles';
import Menu_Pontinho from '../Componentes/Menu_Pontinho';

export default function FavoriteScreen() {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);


    const { user, setUser } = React.useContext(UserContext);
    const { receitas, setReceitas, totalReceitas, setTotalReceitas, page, setPage } = React.useContext(FavoriteProvider);

    function onRefresh() {
        loadRecipes();
    }

    async function loadRecipes(){
        const response = await api_users.get(`favorites?page=${page}`, {
          headers: {
            Authorization: user.id,
          }
        })
          .catch(function (error) {
            setError(error)
          });
        setReceitas([...receitas, ...response.data]); 
        /**(receitas).map(receita => {
            receita['id'] = receita['receita_id'];
            delete receita.receita_id;
        })*/
        setTotalReceitas(response.headers.total_receitas_favoritas);
        setPage(page + 1);
        setLoading(false);
      }

      React.useEffect(() => {
          if(user.loggedIn){
            setLoading(true);
            loadRecipes();
          }
      }, [user])

      
    return (
        <>
            {!user.loggedIn ?
                <>
                    <Header_Base />
                    <LoginScreen setIsSignIn={setUser} />
                </>
                : <>
                     <Appbar.Header style={styles_header.header}>
                        <View>
                        <Text style={{
                            color: "#fff",
                            paddingLeft: 10,
                            fontSize: 20,
                        }}>Suas Receitas</Text>
                        </View>	
                        <Menu_Pontinho/> 			             
			        </Appbar.Header>
                   
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
                                <Text style={styles.totalText}>{totalReceitas} {(totalReceitas === '1') ? "receita " : "receitas"}</Text>
                            </View>
                            <Divider />

                            <Card_Component receitas={receitas} func={loadRecipes} onRefresh={onRefresh} />
                        </>
                    }
                </>}
            {/**error && <Alert content={error} setShowAlert={setError} />*/}
        </>
    )
}