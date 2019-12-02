import React, {Component} from 'react';
import {View, Text, Button, Header, Container, Title, Left, Body, Right} from 'native-base';


export class OrderScreen extends Component {
  constructor(props) {
      super(props);

      this.state = {
          token: 'ada',
      }
  }

  componentDidMount() {
    if (this.state.token == null) {
            this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#1a1a1d"
          style={{backgroundColor: '#1a1a1d',}}>
            
            <Left/>

            <Body>
              <Title>Order</Title>
            </Body>

            <Right/>

        </Header>

        <View
          style={{
            backgroundColor: '#1a1a1d',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#ffee54'}}>Order Screen</Text>
        </View>
      </Container>
    );
  }
}

export default OrderScreen;