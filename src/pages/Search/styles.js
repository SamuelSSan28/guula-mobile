import {StyleSheet} from 'react-native';
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 3

    },
	ingredientes_box:{
		margin: 10,
	},
	ingredientes_quant_box:{
		margin: 5,
		alignItems:'center',
	},
	ingredientes_box_text:{
		marginBottom: 5,
		color:"#a6a6a6",
		fontSize:15,
		fontWeight: "bold",
	
	},
	ingredientes_quant_text:{
		color:"#a6a6a6",
		fontSize:16,

	},
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 0,
      marginTop:0
    },
    chip: {
      backgroundColor:"#ff914d",
      margin: 4,

    },
    tiny: {
      color:"#ffff"
    },
    text: {
      textAlign: "center",
      color: "#595959",
      fontFamily:'Poppins_400Regular',
      fontSize: 18,
      paddingBottom: 30
    },container: {
      flex: 1, 
        justifyContent: "center",
        backgroundColor:"#fff",
        alignItems: "center",
        padding: 10,
    },
    image:{
      margin:10,
      width: 150,
      height: 150,
    },
    recipeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
  }, recipeIconsAndInfo: {
  alignItems: 'center',
  flexDirection: 'row',
  },
  recipeInfoColor: {
      color: "#545454"
  },titulo: {
    textAlign: "center",
    color: "#545454",
    fontSize: 19,
    fontWeight:"300",
    fontFamily:""
  }
  
  });
