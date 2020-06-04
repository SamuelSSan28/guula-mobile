import * as React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import styles from '../Base/styles';
import { useNavigation } from '@react-navigation/native';

export default function Header_Back() {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction color='#ffffff' onPress={() => navigation.goBack()} />
    </Appbar.Header>
  );
}