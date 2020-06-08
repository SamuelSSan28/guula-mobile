import React, {useState, useEffect} from 'react';
import Routes from './src/Routes.js';
import {UserProvider} from './providers/UserProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import {AsyncStorage} from 'react-native';

export default function App() {
  
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
      AsyncStorage.setItem('userId', user.id);
    }catch(error){

    }
  }
  
  useEffect(() => {
    loadUser();
  }, [])
  useEffect(() => {
    storeUser();
  }, [user])
  return (
    <UserProvider value={{user, setUser}}>
      <PaperProvider>
        <Routes/>
      </PaperProvider>
    </UserProvider>
  ); 
}
