// fazer todos os imports necessários


// export default cadastroscreen

//atributos da classe (state)
//nome
//email
//senha
//repeticao da senha
//loading

//metodos da classe (funcoes)
//pega o nome digitado
//fazer um touppercase
//pega o email digitado
//validar o email
//pega a senha digitada
//criptografar a senha (talvez)
//pega repeticao da senha
//verificar se as senhas correspondem
//enviar para o back

//retorno  (render)
//header-cadastro
//caixa de texto - nome
//caixa de texto - email
//caixa de texto - senha
//caixa de texto - confirmar senha
// botao de cadastrar

import React, { useState } from 'react';
//import * as React from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Header_Back from '../Componentes/Header_Back'
import api from '../../services/api';

export default function SignupScreen()  {

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

  function isEmail(field) {
    usuario = field.substring(0, field.indexOf("@"));
    dominio = field.substring(field.indexOf("@") + 1, field.length);

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
    if(!isEmail(text_email)){
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
    if(!existe_erro){
      await funcao_cadastrar();
    }
  }

  async function funcao_cadastrar() {

    const data = {
      nome: text_nome,
      senha_p: text_senha,
      email_p: text_email
    };

    try {
      const response = await api.post('users', data);
      if(response.status == 200){
        alert('Usuário cadastrado com sucesso!');
      }
      else{
        alert('Falha ao cadastrar usuário');
      }

    } catch (err) {
      alert('Falha ao cadastrar usuário');
    }
  }


    return (
      <>
        <Header_Back />
        <TextInput
          label='Nome'
          value={text_nome}
          onChangeText={text_nome => { setText_nome(text_nome); setNome_erro(false); }}
          error={nome_erro}
        />
        <HelperText
          type="error"
          visible={nome_erro}
        >
          {mensagem_nome_erro}
        </HelperText>
        <TextInput
          label='Email'
          value={text_email}
          onChangeText={text_email => {setText_email(text_email); setEmail_erro(false); }}
          error={email_erro}
        />
        <HelperText
          type="error"
          visible={email_erro}
        >
          {mensagem_email_erro}
        </HelperText>
        <TextInput secureTextEntry={true}
          label='Senha'
          value={text_senha}
          onChangeText={text_senha => {setText_senha(text_senha); setSenha_erro(false); }}
          error={senha_erro}
        />
        <HelperText
          type="error"
          visible={senha_erro}
        >
          {mensagem_senha_erro}
        </HelperText>
        <TextInput secureTextEntry={true}
          label='Confirmar Senha'
          value={text_confirmar_senha}
          onChangeText={text_confirmar_senha => { setText_confirmar_senha(text_confirmar_senha); setSenha_erro(false); }}
          error={senha_erro}
        />
        <HelperText
          type="error"
          visible={senha_erro}
        >
          {mensagem_senha_erro}
        </HelperText>
        <Button mode="contained" onPress={() => {funcao_validar()}} color='#ff914d' dark={true}>
          Cadastrar
       </Button>
      </>
    );
}