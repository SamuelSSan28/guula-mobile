import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../../services/api.js'
import Header_Base from '../Componentes/Header_Base';
import Card_Component from '../Componentes/Card';


export default function HomeScreen(){
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadRecipes(){
    if(loading){
      return;
    }
    setLoading(true);
    const res = await api.get(`recipes?page=${page}`).catch(function(err){alert(err)});
    setRecipes([...recipes,...res.data]);
    setPage(page+1);
    setLoading(false);
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
    <Card_Component receitas={recipes} func={loadRecipes} loading={loading}/>  
    </>
    )
}