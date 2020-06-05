import * as React from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';

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
                <Dialog.Actions style={{
                }}>
                    <Button
                    color="#ff914d"
                    onPress={() => _hideDialog()}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}