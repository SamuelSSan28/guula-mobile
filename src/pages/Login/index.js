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
      alert(err.response.data.error);
    }
    setLoading(false);
  }

  function isEmail(field) {
    var usuario = field.substring(0, field.indexOf("@"));
    var dominio = field.substring(field.indexOf("@") + 1, field.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    }
    else {
        return false;
    }
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
          visible={!isEmail(email_p)}
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
        {loading ? <ActivityIndicator size="small" color="#ff914d" /> : <Button mode="contained" onPress={() => handleLogin()} color='#ff914d' dark={true}>
         Entrar     
       </Button>}
        <Button
          style={{backgroundColor: "transparent"}}
        >
          <Text style={{color: "#ff914d", fontSize: 14}}> Criar uma conta </Text>
        </Button>

      </View>

  </>
    )
}
