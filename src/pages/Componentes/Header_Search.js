 import * as React from 'react';
 import { Appbar,Searchbar } from 'react-native-paper';
 import styles from '../Base/styles';
 
 export default class Header_Search extends React.Component {
	state = {
	  searchQuery: '',
	};
  
	_onChangeSearch = query => this.setState({ searchQuery: query });
  
	render() {
	  const { searchQuery } = this.state;
	  return (
		<Appbar.Header style={styles.header}>
			<Searchbar
			placeholder="Search"
			onIconPress={this._onChangeSearch}
			value={searchQuery}
			iconColor="#ff914d"
				/>
		</Appbar.Header>
	  );
	}
  }