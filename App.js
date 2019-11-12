import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { startApp } from './src/navigation/AppContainer';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,

    }
  }
  async componentDidMount() {
    const id_login = await AsyncStorage.getItem('id_login');

    console.log(id_login);

    if (id_login != null) {
      this.setState({
        isSignedIn: true,
      })
    }

  }
  render() {
    const { isSignedIn, hasTeam } = this.state;
    console.log(hasTeam);
    const RootStack = startApp(isSignedIn);
    const AppContainer = createAppContainer(RootStack);
    return <AppContainer />
  }
}

export default App;
