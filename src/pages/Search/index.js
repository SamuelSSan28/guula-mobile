import * as React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Chip, List, useTheme, Snackbar } from 'react-native-paper';
import Header_Search from '../Componentes/Header_Search';

// Teste das caixinha de ingredientes

const ChipExample = () => {
  const [visible, setVisible] = React.useState(false);
  const { colors } = useTheme();

  return (
    <>
    <Header_Search/>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        <List.Section title="Ingredientes: ">
          <View style={styles.row}>
            
            <Chip onPress={() => {}} onClose={() => {}} style={styles.chip}>
              Close 
            </Chip>
            
            <Chip onPress={() => {}} onClose={() => {}} style={styles.chip}>
              Close button
            </Chip>
            
           
          </View>
        </List.Section>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        onLongPress activated!
      </Snackbar>
    </>
  );
};

ChipExample.title = 'Chip';

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
    backgroundColor:"#ff5c5c",
    margin: 4,
  },
  tiny: {
    marginVertical: 2,
    marginRight: 2,
    marginLeft: 2,
    minHeight: 19,
    lineHeight: 19,
  },
});

export default ChipExample;