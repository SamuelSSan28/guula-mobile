 import * as React from 'react';
 import { Appbar } from 'react-native-paper';
 import Menu_Pontinho from './Menu_Pontinho';
 import styles from '../Base/styles';
 import logoImg from '../assets/logo.png';
 import {Image, Text} from 'react-native';
 
 export default class Header_Base extends React.Component {
	render() {
		return (
			<Appbar.Header style={styles.header}>
                <Image source={logoImg}/>
                <Menu_Pontinho/> 
			</Appbar.Header>
		)
	}
	
 }