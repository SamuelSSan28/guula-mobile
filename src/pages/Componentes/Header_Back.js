import * as React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import styles from '../Base/styles';
import { useNavigation } from '@react-navigation/native';

export default function Header_Back() {
  const navigation = useNavigation();
  let back = true;


  function go_back(){
    if(back){
      back =false
      navigation.goBack()
    }
    
  }


  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction style={{marginBottom: 20}} color='#ffffff' onPress={go_back} />
    </Appbar.Header>
  );
}