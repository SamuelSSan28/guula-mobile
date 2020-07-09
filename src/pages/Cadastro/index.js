import React, { useState } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import api_users from '../../services/api_users';
import { Text , ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js';
import Alert from '../Componentes/Alert';

export default function SignupScreen() {


  const [text_nome, setText_nome] = useState('');
  const [text_email, setText_email] = useState('');
  const [text_senha, setText_senha] = useState('');
  const [text_confirmar_senha, setText_confirmar_senha] = useState('');
  const [nome_erro, setNome_erro] = useState(false);
  const [mensagem_nome_erro, setMensagem_nome_erro] = useState('');
  const [senha_erro, setSenha_erro] = useState(false);
  const [mensagem_senha_erro, setMensagem_senha_erro] = useState('');
  const [email_erro, setEmail_erro] = useState(false);
  const [mensagem_email_erro, setMensagem_email_erro] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    content: '',
    title: '',
  });

  const navigation = useNavigation();

  function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async function funcao_validar() {
    let existe_erro = false;
    if (!text_nome) {
      existe_erro = true;
      setNome_erro(true)
      setMensagem_nome_erro('Insira seu nome')
    }
    if (text_nome.length > 255) {
      existe_erro = true;
      setNome_erro(true);
      setMensagem_nome_erro('Nome excede número de caracteres')
    }
    if (!isEmail(text_email)) {
      existe_erro = true;
      setEmail_erro(true);
      setMensagem_email_erro('Email inválido')
    }
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
      await funcao_cadastrar();
    }
  }

  async function funcao_cadastrar() {


    if (loading) {
      return;
    }

    const data = {
      nome: text_nome,
      senha_p: text_senha,
      email_p: text_email
    };

    setLoading(true);
    try {
      const response = await api_users.post('users', data);
      if (response.status == 200) {
        setAlert({
          visible: true,
          content: 'Usuário cadastrado com sucesso!',
          title: 'Sucesso'
        })
      }
      else {
        Alert.alert(
          'Erro',
          'Falha ao cadastrar usuário!',
          null,
          { cancelable: false }
        );
      }

    } catch (err) {
      setAlert({
        visible: true,
        content: err.response.data.error,
        title: ''
      })
    }
    setLoading(false);
  }


  return (
    <>
      <Header_Back />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.textTop}>Crie sua conta de maneira rápida e fácil!</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={text_nome}
          placeholderTextColor="black"
          onChangeText={text_nome => { setText_nome(text_nome); setNome_erro(false); }}
          underlineColor="transparent"
          theme={{
            colors: {
              primary: 'transparent'
            }
          }}
          error={nome_erro}
        />
        <HelperText
          type="error"
          visible={nome_erro}
          style={{
            fontFamily: 'Poppins_400Regular',
          }}
        >
          {mensagem_nome_erro}
        </HelperText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
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
          style={{
            fontFamily: 'Poppins_400Regular',
          }}
        >
          {mensagem_email_erro}
        </HelperText>
        <TextInput secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
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
          style={{
            fontFamily: 'Poppins_400Regular',
          }}
        >
          {mensagem_senha_erro}
        </HelperText>
        <TextInput secureTextEntry={true}
          style={styles.input}
          placeholder="Confirmar Senha"
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
          style={{
            fontFamily: 'Poppins_400Regular',
          }}
        >
          {mensagem_senha_erro}
        </HelperText>
        {loading ? <ActivityIndicator size="small" color="#ff914d" /> : <Button mode="contained" onPress={() => { funcao_validar() }} color='#ff914d' dark={true}>
          Cadastrar
       </Button>}
       </KeyboardAvoidingView>
       {alert.visible && <Alert alert={alert} setAlert={setAlert} onPress={() => navigation.goBack()}/>} 
    </>
  );
}