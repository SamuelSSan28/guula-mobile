import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/Home';
import BottomMenu from './pages/Componentes/BottomNavigation';



const AppStack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name ="Home" component={BottomMenu}/>
            </AppStack.Navigator>
        </NavigationContainer>

    )
}