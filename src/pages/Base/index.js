import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from '../Home';
import SearchScreen from '../Search';
import FavoriteScreen from '../Favorite';
import OfflineScreen from '../Offline';
import NetInfo from '@react-native-community/netinfo'

const HomeRoute = () =><HomeScreen/>;

const SearchRoute = () => <SearchScreen/>;

const FavoriteRoute = () =><FavoriteScreen/>;

const OfflineRoute = () => <OfflineScreen/>;

export default class Base extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home',color: '#ff914d' },
      { key: 'search', title: 'Search', icon: 'magnify',color: '#ff914d' },
      { key: 'favorite', title: 'Favorite', icon: 'heart-outline',color: '#ff914d' },
    ],
    isConnected: true,
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap(
  !this.state.isConnected ? 
  {
    home: OfflineRoute,
    search: OfflineRoute,
    favorite: OfflineRoute,
  } 
  :
  {
    home: HomeRoute,
    search: SearchRoute,
    favorite: FavoriteRoute,
  });

  componentDidMount(){
    this.CheckConnectivity();
  }

  CheckConnectivity(){
    NetInfo.addEventListener(state => {
      this.setState({isConnected: state.isConnected});
    });
  }

  render() {
    return (    
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          shifting={true}
        />
    );
  }
}
