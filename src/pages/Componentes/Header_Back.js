import * as React from 'react';
import { Appbar,Searchbar } from 'react-native-paper';
import styles from '../Base/styles';

export default class Header_Back extends React.Component {
 
 render() {
   return (
   <Appbar.Header style={styles.header}> 
    <Appbar.BackAction color = '#ffffff' onPress={() => {}} />
   </Appbar.Header>
   );
 }
 }