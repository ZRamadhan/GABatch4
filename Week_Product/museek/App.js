import React, {Component} from 'react';
import { Root } from 'native-base'
import {AppContainer} from './app/config/router';
import {Provider} from 'react-redux';
import configureStore from './store';
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

export default App;
