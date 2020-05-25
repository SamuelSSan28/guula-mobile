import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {TouchableOpacity} from 'react-native';

export default class Card_Component extends React.Component {
  render() {
    return (   
      <Card style={{padding: 10,margin:5}} elevation={2}>
        <TouchableOpacity>
          <Card.Cover source={{ uri: 'https://www.receiteria.com.br/wp-content/uploads/como-fazer-miojo-no-micro-ondas-1-730x450.jpg' }} />
          <Card.Content>
            <Title>Receitinha da Gisele</Title>
            <Paragraph>2 minutinhos e tá pronto </Paragraph>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    )  
  }
}
