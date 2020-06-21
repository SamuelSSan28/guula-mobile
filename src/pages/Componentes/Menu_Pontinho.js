import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../providers/UserProvider';

export default function Menu_Pontinho (props) {
   
  const [visible, setVisible] = React.useState(false); 
  const navigation = useNavigation();

  const {user, setUser} = React.useContext(UserContext);

  function navigateToAbout(){
    navigation.navigate('About');
  }

  function logout(){
    setUser({
      id: null,
      loggedIn: false
    })
  }

  function openMenu(){
    setVisible(true);
  }

  function closeMenu(){
    setVisible(false);
  }

  return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
              <Appbar.Action icon="dots-vertical" onPress={openMenu} />
          }
        >
          <Menu.Item onPress={navigateToAbout} title="About" icon="information-outline" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Contact us" icon="email"/>
          {user.loggedIn &&
          <>
            <Divider />
            <Menu.Item onPress={logout} title="Logout" icon= "logout-variant"/> 
          </>
          }
        </Menu>
      </View>
  );

}