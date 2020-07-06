import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Base from './pages/Base';
import SignUpScreen from './pages/Cadastro';
import RecipeScreen from './pages/Receita';
import About from './pages/About';
import PasswordScreen from './pages/ForgotAccount';

const AppStack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator 
                screenOptions={{
                    headerShown:false,
                    cardStyle : {
                    }
                }}
            >
                <AppStack.Screen name ="Home" component={Base}/>
                <AppStack.Screen name ="Cadastro" component={SignUpScreen}/>
				<AppStack.Screen name ="Recipe" component={RecipeScreen}/>
                <AppStack.Screen name ="About" component={About}/>
                <AppStack.Screen name ="Senha" component={PasswordScreen}/>
            </AppStack.Navigator>
        </NavigationContainer>

    )
}