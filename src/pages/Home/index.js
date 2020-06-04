import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../../services/api.js'
import Header_Base from '../Componentes/Header_Base';

import Card_Component from '../Componentes/Card';


export default function HomeScreen(){
  const [recipes, setRecipes] = useState([]);

  async function loadRecipes(){
    const res = await api.get("recipes/random/8").catch(function(err){alert(err)});
    setRecipes(res.data);
  }
  useEffect( () => {loadRecipes()}, []); 


  /*  
    function navigateToDetail(incident){
        navegation.navigate('Detail',{incident});
    }
    Passar os dados das receitas para a rota de receitas
    */

  return(
    <>
    <Header_Base/>
    <Card_Component receitas={recipes}/> 
    </>
    )
}