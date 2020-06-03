import React from 'react';
import Routes from './src/Routes.js';
import {UserProvider} from './providers/UserProvider';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <UserProvider>
      <PaperProvider>
        <Routes/>
      </PaperProvider>
    </UserProvider>
  );
}
