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
      hasTeam: false
    }
  }
  async componentDidMount() {
    const id_login = await AsyncStorage.getItem('id_login');
    const team_id = await AsyncStorage.getItem('team_id')
    console.log(id_login);
    console.log(team_id);
    if (id_login != null) {
      this.setState({
        isSignedIn: true,
      })
    }
    if (team_id != null) {
      this.setState({
        hasTeam: true,
      })
    }
  }
  render() {
    const { isSignedIn, hasTeam } = this.state;
    const RootStack = startApp(isSignedIn, hasTeam);
    const AppContainer = createAppContainer(RootStack);
    return <AppContainer />
  }
}

export default App;
