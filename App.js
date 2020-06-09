import React, {useState, useEffect} from 'react';
import Routes from './src/Routes.js';
import {UserProvider} from './providers/UserProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import {AppLoading} from 'expo';
import {AsyncStorage} from 'react-native';
import {Poppins_400Regular, Poppins_700Bold, useFonts} from '@expo-google-fonts/poppins';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const [user, setUser] = useState({
    id: null,
    loggedIn: false
  })

  async function loadUser(){
  try{
    const value = await AsyncStorage.getItem('userId');
    if(value !== null){
      setUser({
        id: value,
        loggedIn: false
      })
    }
  }
  catch(error){ 

  }
}
  async function storeUser(){
    try{
      AsyncStorage.setItem('userId', String(user.id));
    }catch(error){

    }
  }
  
  useEffect(() => {
    loadUser();
  }, [])
  useEffect(() => {
    storeUser();
  }, [user])

  if(!fontsLoaded){
    //landing
    return <AppLoading/>
  } 
  
  return (
    <UserProvider value={{user, setUser}}>
      <PaperProvider>
        <Routes/>
      </PaperProvider>
    </UserProvider>
  ); 
}
