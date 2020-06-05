import {StyleSheet} from 'react-native';
import {Container} from '../../GlobalStyles'

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 50,
        ...Container
      },
      input: {
        height: 45,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
      },
      submitButton: {
    
      },
      submitButtonText: {
    
      },
      textTop: {
        textAlign: "center",
        color: "#595959",
        fontSize: 15,
        paddingBottom: 30
      },
      textBottom:{
        color: "#595959", 
        fontSize: 14, 
        textAlign: "center", 
        padding: 10
      }

});