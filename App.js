import React, {useState, useEffect} from 'react';
import Routes from './src/Routes.js';
import {UserProvider} from './providers/UserProvider';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {

  const [user, setUser] = useState({
    id: '',
    loggedIn: false
  })


  return (
    <UserProvider value={{user, setUser}}>
      <PaperProvider>
        <Routes/>
      </PaperProvider>
    </UserProvider>
  ); 
}
