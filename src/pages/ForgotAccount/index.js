import React, { useState } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import api from '../../services/api';
import api_email from '../../services/api_email';
import api_users from '../../services/api_users';
import * as Crypto from 'expo-crypto';
import { Text, Alert, ActivityIndicator, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js'

export default function PasswordScreen() {


  const [text_codigo, setText_codigo] = useState('');
  const [codigo_aleatorio, setCodigo_aleatorio] = useState('');
  const [text_email, setText_email] = useState('');
  const [text_senha, setText_senha] = useState('');
  const [text_confirmar_senha, setText_confirmar_senha] = useState('');
  const [codigo_erro, setCodigo_erro] = useState(false);
  const [mensagem_codigo_erro, setCodigo_nome_erro] = useState('');
  const [senha_erro, setSenha_erro] = useState(false);
  const [mensagem_senha_erro, setMensagem_senha_erro] = useState('');
  const [email_erro, setEmail_erro] = useState(false);
  const [mensagem_email_erro, setMensagem_email_erro] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [estado, setEstado] = useState(1);


  const navigation = useNavigation();

  function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async function enviaCodigo() {
    const data = {
      email: text_email
    };

    const response = await api_email.post('forgotaccount', data)
    if (response.status == 200) {
      setCodigo_aleatorio(response.data);
      setEstado(2);
    }
    else {
      Alert.alert("Não foi possível enviar o e-mail")
    }

  }

  async function validar_email() {
    let existe_erro = false;
    if (loading) {
      return;
    }
    setLoading(true);
    if (!isEmail(text_email)) {
      existe_erro = true;
      setEmail_erro(true);
      setMensagem_email_erro('Email inválido')
    }
    else {
      const email_ = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        text_email,
      );
      const response = await api_users.get('user', { 'headers': {"email":email_}});
      
      if (response.data.exist == false) {
        existe_erro = true;
        setEmail_erro(true);
        setMensagem_email_erro('Email não cadastrado!')
      }
      if (!existe_erro) {
        enviaCodigo();
      }
    }
    setLoading(false);

  }

  async function validar_codigo() {
    if (loading) {
      return;
    }
    setLoading(true);
    if (text_codigo != codigo_aleatorio) {
      Alert.alert("Código inválido!")
    }
    else {
      setEstado(3);
    }
    setLoading(false);
  }

  async function validar_senha() {
    let existe_erro = false;
    if (text_senha.length < 6) {
      existe_erro = true;
      setSenha_erro(true);
      setMensagem_senha_erro('A senha deve possuir ao menos 6 caracteres')
    }
    if (text_senha != text_confirmar_senha) {
      existe_erro = true;
      setSenha_erro(true);
      setMensagem_senha_erro('Senhas não correspondem')
    }
    if (!existe_erro) {
      await alterar_senha();
    }
  }

  async function alterar_senha() {

    if (loading) {
      return;
    }

    const data = {
      senha: text_senha,
      email: text_email
    };

    setLoading(true);
    try {
      const response = await api_users.post('users/password', data);
      if (response.status == 200) {
        Alert.alert(
          'Sucesso',
          'Senha alterada com sucesso!',
          [
            { text: 'OK', onPress: () => navigation.goBack() }
          ],
          { cancelable: false }
        );
      }
      else {
        Alert.alert(
          'Erro',
          'Falha ao alterar senha!',
          null,
          { cancelable: false }
        );
      }

    } catch (err) {
      Alert.alert(
        'Erro',
        err.response.data.error,
        null,
        { cancelable: false }
      );

    }
    setLoading(false);
  }


  return (
    <>
      <Header_Back />
      {(estado == 1) ?
        <View

          style={styles.container}
        >
          <Text style={styles.textTop}>Digite seu e-mail</Text>
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
          {loading ? <ActivityIndicator size="small" color="#ff914d" /> : <Button mode="contained" onPress={() => { validar_email() }} color='#ff914d' dark={true}>
            Buscar
       </Button>}
        </View> : (estado == 2) ? <View

          style={styles.container}
        >
          <Text style={styles.textTop}>Um código será enviado para seu e-mail. Insira-o no campo abaixo para redefinir sua senha.</Text>
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={text_codigo}
            placeholderTextColor="black"
            onChangeText={text_codigo => { setText_codigo(text_codigo); setCodigo_erro(false); }}
            underlineColor="transparent"
            theme={{
              colors: {
                primary: 'transparent'
              }
            }}
            error={codigo_erro}
            keyboardType={'numeric'}
          />
          <HelperText
            type="error"
            visible={codigo_erro}
          >
            {mensagem_codigo_erro}
          </HelperText>
          {loading ? <ActivityIndicator size="small" color="#ff914d" /> : <Button mode="contained" onPress={() => { validar_codigo() }} color='#ff914d' dark={true}>
            Recuperar Senha
</Button>}
        </View> : <View style={styles.container}>
            <Text style={styles.textTop}>Insira sua nova senha</Text>
            <TextInput 
              style={styles.input}
              keyboardType="default"
              secureTextEntry
              placeholder="Nova Senha"
              value={text_senha}
              placeholderTextColor="black"
              onChangeText={text_senha => { setText_senha(text_senha); setSenha_erro(false); }}
              underlineColor="transparent"
              theme={{
                colors: {
                  primary: 'transparent'
                }
              }}
              error={senha_erro}
            />
            <HelperText
              type="error"
              visible={senha_erro}
            >
              {mensagem_senha_erro}
            </HelperText>
            <TextInput 
              style={styles.input}
              keyboardType="default"
              secureTextEntry
              placeholder="Confirmar Nova Senha"
              value={text_confirmar_senha}
              placeholderTextColor="black"
              onChangeText={text_confirmar_senha => { setText_confirmar_senha(text_confirmar_senha); setSenha_erro(false); }}
              underlineColor="transparent"
              theme={{
                colors: {
                  primary: 'transparent'
                }
              }}
              error={senha_erro}
            />
            <HelperText
              type="error"
              visible={senha_erro}
            >
              {mensagem_senha_erro}
            </HelperText>
            {loading ? <ActivityIndicator size="small" color="#ff914d" /> : <Button mode="contained" onPress={() => { validar_senha() }} color='#ff914d' dark={true}>
              Salvar
       </Button>}
          </View>}
    </>
  );
}