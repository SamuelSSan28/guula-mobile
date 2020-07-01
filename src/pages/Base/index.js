import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from '../Home';
import SearchScreen from '../Search';
import FavoriteScreen from '../Favorite';
import {View} from 'react-native'

const HomeRoute = () => <HomeScreen/>;

const SearchRoute = () => <SearchScreen/>;

const FavoriteRoute = () =><FavoriteScreen/>;

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
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          shifting={true}
        />
    );
  }
}
