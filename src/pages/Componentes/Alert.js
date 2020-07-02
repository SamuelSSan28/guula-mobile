import * as React from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';
import {View, Text} from 'react-native';

export default function Alert(props) {

    function _hideDialog (){
        props.setAlert({
            visible: false,
            content: '',
            title: ''
        })
    }

    return (
        <Portal>
            <Dialog
                style = {{
                    textAlign: "center"
                }}
                visible={props.alert.visible}
                onDismiss={() => _hideDialog()}>
                    <View style={{
                    textAlign: "center",
                    alignItems:"center"

                }}>
                <Dialog.Title>

                        <Text style={{
                            fontFamily: 'Poppins_400Regular'
                        }}>
                        {props.alert.title}
                        </Text>
                </Dialog.Title>
                </View>
                
                <Dialog.Content>
                    <Paragraph style={{
                        color: "#595959",
                        textAlign: "center",
                        fontSize: 16,
                        fontFamily: 'Poppins_400Regular'
                    }}>{props.alert.content}</Paragraph>
                </Dialog.Content>
                <View  style={{
                        //alignItems:"center",
                        marginTop: 0,
                }}>
                <Dialog.Actions>
                 
                    <Button
                    color="#ff914d"
                    onPress={() => _hideDialog()}>Ok</Button>
                </Dialog.Actions>
                </View>

            </Dialog>
        </Portal>
    );
}