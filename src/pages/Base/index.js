import * as React from 'react';
import { BottomNavigation, Provider} from 'react-native-paper';
import HomeScreen from '../Home';
import FavoriteScreen from '../Favorite';
import LoginScreen from '../Login';
import logoImg from '../assets/logo.png';
import styles from './styles';
import { Appbar } from 'react-native-paper';
import Header from '../Componentes/Header';
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
    AsyncStorage //armazenar dados dos usuario (id, nome)
  } from 'react-native';


const HomeRoute = () => <View><HomeScreen/></View>;

const SearchRoute = () => <Text>Search</Text>;

const FavoriteRoute = () => <View>
                              {!isSignIn ? <LoginScreen/> : <FavoriteScreen/>}
                            </View>;

export default class Base extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home',color: '#ff914d' },
      { key: 'search', title: 'Search', icon: 'magnify',color: '#ff914d' },
      { key: 'favorite', title: 'Favorite', icon: 'heart-outline',color: '#ff914d' },
    ],
    isSignIn: false, //usuario logado?
    userId: null,
  };

  componentDidMount(){
    //resgatar dados do usuario logado
    /**_retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('id');
        if (value !== null) {
          this.setState({isSignIn: true, userId: value});
        }
      } catch (error) {
        // Error retrieving data
      }
    };*/
    //--------gambiarra provisória---------
    this.setState({isSignIn: true, userId: '1'});
  }

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
