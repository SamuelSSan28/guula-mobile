import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Chip, List, Searchbar,Appbar,Subheading } from 'react-native-paper';
import Header_Search from '../Componentes/Header_Search';
import style from '../Base/styles';
import { set } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 12,
    },
    chip: {
      backgroundColor:"#ff914d",
      margin: 4,

    },
    tiny: {
      color:"#ffff"
    },
  });


function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    
}

export default function SearchScreeen(){
  const [searchQuery, setSearchQuery] = useState('');
  var [ingredientes, setIngredientes] = useState([]);
  const [quantReceitas, setQuantReceitas] = useState(0);
  const [refresh,setRefresh] = useState(false)
  const renderItem = ({item:ingrediente}) => (
    <Chip onPress={() => {}} onClose={() => {_removeIngrediente(ingrediente)}} style={styles.chip} textStyle={styles.tiny}>
         {ingrediente}
    </Chip>
  );


  async function _onPressSearch(){
    if(searchQuery == '')
      return false
    ingredientes.push(searchQuery)
    setRefresh(!refresh)
  }
  
  async function _removeIngrediente(ingrediente){
    var index = ingredientes.indexOf(ingrediente);
    if (index != -1) ingredientes.splice(index, 1);
    setRefresh(!refresh)
  }

    return (    
      <>
       <Appbar.Header style={style.header}>
        <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        onIconPress={_onPressSearch}
        iconColor="#ff914d"
          />
		  </Appbar.Header>

       <ScrollView style={[styles.container]} >
        {ingredientes.length ? <List.Section title="Ingredientes: ">
          <FlatList
          contentContainerStyle={styles.row}
          data={ingredientes}
          renderItem={renderItem}
          extraData={refresh}
          />
          
        </List.Section>:<View></View>}
      </ScrollView>
      
      </>
    ); 
  
}
