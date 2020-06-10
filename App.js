import React, { useState, useEffect } from 'react';
import Routes from './src/Routes.js';
import { UserProvider } from './providers/UserProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';
import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import api from './src/services/api';
import {FavoriteProvider} from './providers/FavoriteProvider';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const [user, setUser] = useState({
    id: null,
    loggedIn: false
  })
  const [receitas, setReceitas] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);

  async function loadUser() {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setUser({
          id: value,
          loggedIn: false
        })
        //buscar lista de receitas favoritas aqui
      }
    }
    catch (error) {

    }
  }
  async function storeUser() {
    try {
      AsyncStorage.setItem('userId', String(user.id));
    } catch (error) {

    }
  }

  async function loadRecipes(){
    const response = await api.get('favorites', {
      headers: {
        Authorization: user.id,
      }
    })
      .catch(function (error) {
        setError(error)
      });

    setReceitas(response.data);
    setTotalReceitas(response.headers.total_receitas_favoritas);
  }

  useEffect(() => {
    loadUser();
  }, [])
  useEffect(() => {
    storeUser();
  }, [user])
  useEffect(() => {
    loadRecipes();
  }, [user, totalReceitas, receitas])

  if (!fontsLoaded) {
    //landing
    return <AppLoading />
  }

  return (
    <UserProvider value={{ user, setUser }}>
      <FavoriteProvider value={{receitas, setReceitas, totalReceitas, setTotalReceitas}}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </FavoriteProvider>
    </UserProvider>
  );
}
