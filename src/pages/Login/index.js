import * as React from 'react';
import {useState} from 'react';
import api from '../../services/api';
import {Text, View, StyleSheet, ActivityIndicator,TouchableOpacity, AsyncStorage} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';


const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    paddingTop: 100,
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    margin: 15,
    height: 40,
    
  },
  submitButton: {
    padding: 10,
    backgroundColor: "orange",
    margin: 15,
    alignItems: "center",
    height: 40
  },
  submitButtonText: {
    color: "white"
  }

})

export default function LoginScreen(props){
  const [email_p, setEmail] = useState('');
  const [senha_p, setSenha] = useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleLogin(){
    if (loading) {
      return;
    }
    setLoading(true);
    try{
      const response = await api.post('users/login', {senha_p, email_p});
      const id = response.data;
      /**try {
        await AsyncStorage.setItem("userId", JSON.stringify({id}));
      } catch (error) {
       console.log("Something went wrong", error);
      }
      */
      props.setIsSignIn({
        id: id,
        loggedIn: true
      });
    }catch(err){
      alert("Email ou senha incorretos!");
    }
    setLoading(false);
  }

  function handleEmailError(){
    return !(email_p.includes('@') || email_p === '');
  }

    return(
        <>
            <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email_p}
          placeholderTextColor="black"
          onChangeText={text => setEmail(text)}
        />
        <HelperText
          type="error"
          visible={handleEmailError()}
        >
          Email inválido
        </HelperText>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={text => setSenha(text)}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleLogin()}
        >
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.submitButtonText}>Entrar</Text>       }
        </TouchableOpacity>
        <Button
          style={{backgroundColor: "transparent"}}
        >
          <Text style={{color: "orange", fontSize: 14}}> Criar uma conta </Text>
        </Button>

      </View>

  </>
    )
}
