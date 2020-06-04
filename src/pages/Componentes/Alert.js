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
                visible={visible}
                onDismiss={() => _hideDialog()}>
                <Dialog.Content>
                    <Paragraph>{props.content}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => _hideDialog()}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}