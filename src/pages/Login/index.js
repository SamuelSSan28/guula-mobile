import React from 'react';
import {View,Image,Text,TouchableOpacity,Linking} from 'react-native';
import {Feather} from '@expo/vector-icons'
import logoImg from '../../assests/logo.png';
import styles from './styles';
import {useNavigation,useRoute} from '@react-navigation/native'



export default function Incidents(){
    const navegation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    function navigateToIncidentList(){
        navegation.navigate('Incidents');
    }


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity onPress={navigateToIncidentList}>
                    <Feather name="arrow-left" size={28} color='#e82041'/>
                </TouchableOpacity>             
            </View>
            
            <View style={styles.incident}>
                    <Text style={[styles.incidentProperty,{marginTop: 0}]}>ONG: </Text>
                    <Text  style={styles.incidentValue}>{incident.nome} de {incident.cidade}/{incident.uf}</Text>

                    <Text style={[styles.incidentProperty,{marginTop: 0}]}>CASO: </Text>
                    <Text  style={styles.incidentValue}>{incident.titulo}</Text>

                    <Text style={[styles.incidentProperty,{marginTop: 0}]}>DESCRIÇÂO: </Text>
                    <Text  style={styles.incidentValue}>{incident.descricao}</Text>

                    <Text style={[styles.incidentProperty,{marginTop: 0}]}>VALOR: </Text>
                    <Text  style={styles.incidentValue}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incident.valor)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>
                <Text style={styles.heroDescription}>Entre em contato: </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp} >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.action} onPress={sendMail} >
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}