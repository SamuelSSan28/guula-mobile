 import * as React from 'react';
 import { Appbar } from 'react-native-paper';
 import Menu_Pontinho from './Menu_Pontinho';
 import styles from '../Base/styles';
 
 export default class Base extends React.Component {
	render() {
		return (
			<Appbar.Header style={styles.header}>
                <Image source={logoImg}/>
                <Menu_header/> 
			</Appbar.Header>
		)
	}
	
 }