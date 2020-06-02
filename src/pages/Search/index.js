import * as React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Chip, List, Snackbar } from 'react-native-paper';
import Header_Search from '../Componentes/Header_Search';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 12,
    },
    chip: {
      backgroundColor:"#ff914d",
      margin: 4,

    },
    tiny: {
      color:"#ffff"
    },
  });

export default class Base extends React.Component {

  render() {
    return (    
      <>
       <Header_Search/>
       <ScrollView
        style={[styles.container]}
       >
        <List.Section title="Ingredientes: ">
          <View style={styles.row}>
            
            <Chip onPress={() => {}} onClose={() => {}} style={styles.chip} textStyle={styles.tiny}>
              Close 
            </Chip>

          </View>
        </List.Section>
      </ScrollView>
      
      
      </>
    ); 
  }
}
