import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Base from './pages/Base';
import SignUpScreen from './pages/Cadastro';

const AppStack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name ="Home" component={Base}/>
                <AppStack.Screen name ="Cadastro" component={SignUpScreen}/>
            </AppStack.Navigator>
        </NavigationContainer>

    )
}