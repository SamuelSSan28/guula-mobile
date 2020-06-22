import * as React from 'react';
import { useState } from 'react';
import api_users from '../../services/api_users';
import { Text, ActivityIndicator,KeyboardAvoidingView,Platform } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Alert from '../Componentes/Alert';
import * as Crypto from 'expo-crypto';
import { string } from 'yup';

export default function LoginScreen(props) {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pwErr, setPwErr] = useState(false);

  const [alertContent, setAlertContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  

  function navigateToSignUp() {
    navigation.navigate('Cadastro');
  }

  async function handleValidation() {
    if (loading) {
      return;
    }
    let existe_erro = false;
    if (!isEmail(email)) {
      existe_erro = true;
      setEmailErr(true);
    }
    if (senha.length < 6) {
      existe_erro = true;
      setPwErr(true);
    }
    if (!existe_erro) {
      await handleLogin();
    }

  }


  async function handleLogin() {
    setLoading(true);
    try {
      const password = await Crypto.digestStringAsync(
                              Crypto.CryptoDigestAlgorithm.SHA256,
                              senha,
                            );

      const email_ = await Crypto.digestStringAsync(
                              Crypto.CryptoDigestAlgorithm.SHA256,
                              email,
                            );
      
      const response = await api_users.get('users/login', { 'headers': { "senha":password, "email":email_}});
      const id = response.data;
      console.log( response.data)
      props.setIsSignIn({
        id: id,
        loggedIn: true
      });
    } catch (err) {
      console.log(err.response.data)
      setLoading(false);
      setShowAlert(true);
      setAlertContent(err.response.data.error)
    }
    
  }

  function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <>
      <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.textTop}>Entre com a sua conta para salvar suas receitas favoritas!</Text>
         <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          placeholderTextColor="black"
          onChangeText={text => { setEmail(text); setEmailErr(false) }}
          underlineColor="transparent"
          theme={{
            colors: {
              primary: 'transparent'
            }
          }}
        />
        <HelperText
          type="error"
          visible={emailErr}
          style={{
            fontFamily:'Poppins_400Regular',
          }}
        >
          Email inválido
        </HelperText>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={text => { setSenha(text); setPwErr(false) }}
          underlineColor="transparent"
          theme={{
            colors: {
              primary: 'transparent',
            }
          }}
        />
        <HelperText
          type="error"
          visible={pwErr}
          style={{
            fontFamily:'Poppins_400Regular',
          }}
        >
          A senha deve possuir ao menos 6 caracteres
        </HelperText>
        {loading ? <ActivityIndicator size="small" color="#ff914d" /> : <Button mode="contained" onPress={() => handleValidation()} color='#ff914d' dark={true}>
          Entrar
       </Button>}
          <Text style={styles.textBottom}>Não tem uma conta? <Text onPress={() => navigateToSignUp()} style={{ color: "#ff914d", fontSize: 14 }}>Cadastre-se</Text>.</Text>
      </KeyboardAvoidingView>
    {showAlert && <Alert content={alertContent} setShowAlert={setShowAlert}/>}
    </>
  )
}
