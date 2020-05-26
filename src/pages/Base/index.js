import * as React from 'react';
import { BottomNavigation, Provider} from 'react-native-paper';
import HomeScreen from '../Home';
import logoImg from '../assets/logo.png';
import styles from './styles';
import { Appbar } from 'react-native-paper';
import Menu_header from '../Componentes/Menu';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    FlatList,
  } from 'react-native';


const HomeRoute = () => <View><HomeScreen/></View>;

const SearchRoute = () => <Text>Search</Text>;

const FavoriteRoute = () => <Text>Favorite</Text>;

export default class Base extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home',color: '#ff914d' },
      { key: 'search', title: 'Search', icon: 'magnify',color: '#ff914d' },
      { key: 'favorite', title: 'Favorite', icon: 'heart-outline',color: '#ff914d' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    favorite: FavoriteRoute,
  });


  render() {
    return (    
      <>  
       <Appbar.Header style={styles.header}>
                <Image source={logoImg}/>
                <Menu_header/> 
            </Appbar.Header>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          shifting={true}
        />
      </>
    );
  }
}
