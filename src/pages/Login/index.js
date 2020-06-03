import * as React from 'react';
import {useState} from 'react';
import api from '../../services/api';
import {Text, TextInput, View, Button, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';


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
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
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
      alert(err.message);
    }
    setLoading(false);
  }

    return(
        <>
            <View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => setSenha(text)}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        {loading && <Text>loading...</Text>}
      </View>

  </>
    )
}
