import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default function SnackbarComponent(props) {
    function _onToggleSnackBar () {props.setVisible(!visible);}

    function _onDismissSnackBar () {props.setVisible(false);}

    return (
      <View style={styles.container}>
        <Snackbar
          visible={props.visible}
          onDismiss={_onDismissSnackBar}
          action={{
            label: 'OK',
            onPress: () => {
              // Do something
            },
          }}
        >
          {props.content}
        </Snackbar>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});