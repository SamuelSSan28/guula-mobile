import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';

export default class Menu_header extends React.Component {
  state = {
    visible: false,
  };

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <Provider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            anchor={
                <Appbar.Action icon="dots-vertical" onPress={this._openMenu} />
            }
          >
            <Menu.Item onPress={() => {}} title="About" icon="information-outline" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Contact us" icon="email"/>
            <Divider />
            <Menu.Item onPress={() => {}} title="Logout" icon= "logout-variant"/>
          </Menu>
        </View>
      </Provider>
    );
  }
}