import React, { useState } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import api from '../../services/api';
import { Text, Alert, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js'

export default function ForgotPasswordScreen() {


    const [text_email, setText_email] = useState('');
    const [existe_erro, setExiste_erro] = useState(false);
    const [mensagem_erro, setMensagem_erro] = useState(false);

    const navigation = useNavigation();

    function isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async function funcao_validar() {
        if (!isEmail(text_email)) {
            existe_erro = true;
            setEmail_erro(true);
            setMensagem_email_erro('Email inválido')
        }
    }

    return (
        <>
            <Header_Back />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={text_email}
                    placeholderTextColor="black"
                    onChangeText={text_email => { setText_email(text_email); setEmail_erro(false); }}
                    underlineColor="transparent"
                    theme={{
                        colors: {
                            primary: 'transparent'
                        }
                    }}
                    error={email_erro}
                />
                <HelperText
                    type="error"
                    visible={email_erro}
                >
                    {mensagem_email_erro}
                </HelperText>
            </KeyboardAvoidingView>
        </>
    );
}