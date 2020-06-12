import * as React from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';
import {View} from 'react-native';

export default function Alert(props) {
    const [visible, setVisible] = React.useState(true);

    function _hideDialog (){
        setVisible(false);
        props.setShowAlert(false);
    }

    return (
        <Portal>
            <Dialog
                style = {{
                    textAlign: "center"
                }}
                visible={visible}
                onDismiss={() => _hideDialog()}>
                <Dialog.Content>
                    <Paragraph style={{
                        textAlign: "center",
                        color: "#595959"
                    }}>{props.content}</Paragraph>
                </Dialog.Content>
                <View  style={{
                        alignItems:"center"
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