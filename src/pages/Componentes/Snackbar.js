import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, configureFonts } from 'react-native-paper';

export default function SnackbarComponent(props) {
    function _onToggleSnackBar () {props.setVisible(!visible);}

    function _onDismissSnackBar () {props.setVisible(false);}

    return (
      <View style={styles.container}>
        <Snackbar
          style={{
            backgroundColor: "#fff",
          }}
          visible={props.visible}
          duration={1500}
          onDismiss={_onDismissSnackBar}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
            },
          }}
          theme={{
            colors:{
              accent: "#f47f37",
              text: "#f47f37",
              surface: "#595959",
            },
            fonts:configureFonts({
              default: {
                regular: {
                  fontFamily: "Poppins_400Regular",
                }
              }
            })
          }}
        >
          {props.content}
        </Snackbar>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'space-between',
  },
});