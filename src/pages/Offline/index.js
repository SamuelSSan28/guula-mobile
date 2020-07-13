import * as React from 'react';
import Header_Base from '../Componentes/Header_Base';
import {View, Text} from 'react-native'
export default function HomeScreen(){

  return(
    <>
    <Header_Base/>
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Text style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 20,
            color: "#595959",
        }}>Não foi possível conectar ao Guula.</Text>
        {/**
        <Text style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 20,
            color: "#ff914d",
        }}>Tentar novamente</Text>
         */}
    </View>
    </>
    )
}