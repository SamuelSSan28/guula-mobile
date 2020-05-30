import * as React from 'react';
import Header_Base from '../Componentes/Header_Base';
import LoginScreen from '../Login';
import api from '../../services/api';
import {
    View,
    Text,
    AsyncStorage //armazenar dados dos usuario (id, nome)
  } from 'react-native';

export default function FavoriteScreen(){
    const [isSignIn, setIsSignIn] = React.useState(false);
    const [userId, setUserId] = React.useState(null);

    React.useEffect(()=>{
        //resgatar dados do usuario logado
        /**_retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
              this.setState({isSignIn: true, userId: value});
            }
          } catch (error) {
            // Error retrieving data
          }
        };*/
        //--------gambiarra provisória---------
        setIsSignIn(true);
        setUserId('1');

    })
        
        return(
            <>
                <Header_Base/>
            {!isSignIn ? 
                <LoginScreen/> 
            :<>
                <Text>{`Usuario: ${userId}`}</Text>
            </>}
            </>
        )
}