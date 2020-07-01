import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../providers/UserProvider';
import FavoriteProvider from '../../../providers/FavoriteProvider';
import * as MailComposer from 'expo-mail-composer'

export default function Menu_Pontinho (props) {
   
  const [visible, setVisible] = React.useState(false); 
  const navigation = useNavigation();
  const message = "Olá falera do Guula xomo cai cxs";
  const {user, setUser} = React.useContext(UserContext);
  const {setReceitas, setTotalReceitas } = React.useContext(FavoriteProvider);


  function navigateToAbout(){
    navigation.navigate('About');
  }

  function logout(){
    setUser({
      id: null,
      loggedIn: false
    })
    setReceitas([]);
    setTotalReceitas(0);
  }

  
  function sendMail(){
        MailComposer.composeAsync({
            subject:'Guula Contato',
            recipients: ["guula_contato@gmail.com"],
            body: message
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
          justifyContent: 'flex-end',
          marginBottom: 20
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
          <Menu.Item onPress={sendMail} title="Contact us" icon="email"/>
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