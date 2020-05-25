import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text ,Provider} from 'react-native-paper';


const HomeRoute = () => <Text>Home</Text>;

const SearchRoute = () => <Text>Search</Text>;

const FavoriteRoute = () => <Text>Favorite</Text>;

export default class BottomMenu extends React.Component {
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
