import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
}
  from 'react-native';
import logout from './../../../assets/icons/logout.png'

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import { baseURL } from '../../../configs'




class MenuFeature extends Component {
  // static navigationOptions = {
  //   title: 'Ball Fight!',
  //   headerRight: () => (
  //     <TouchableOpacity onPress={
  //       () => { _this._logout }
  //     }>
  //       <Image
  //         source={logout}
  //         style={{ width: 25, height: 25, marginRight: 10 }}
  //       />
  //     </TouchableOpacity>

  //   ),
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Ball Fight',
      headerRight: () => (
        <TouchableOpacity onPress={navigation.getParam('logout')}>
          <Image
            source={logout}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      onClicked: false,
      // id_login: 0,
      personalInfo: {}
    }
  }

  async componentWillMount() {
    const { navigation } = this.props;
    const params = JSON.stringify(navigation.getParam('params'))
    console.log(params)
    await AsyncStorage.setItem('id_login', params);
  }


  async componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
    const id = await AsyncStorage.getItem('id_login');
    console.log(id);
    this.getPersonalInfo(id);
    this._setTeamID();
  }

  getId = async () => {

  }

  getPersonalInfo = (id_login) => {
    const data = {
      id_login
    }
    const config = {
      'Content-Type': 'application/json',
    };
    axios.post(baseURL + '/getPersonalInfo', data, config)
      .then((response) => {
        console.log(response)
        this.setState({
          personalInfo: response.data.rows[0],
        })

      })
      .catch((error) => {
        console.log(error);
      });
  }

  _setTeamID = async () => {
    const { personalInfo } = this.state;
    await AsyncStorage.setItem('team_id', personalInfo.team_id);
    console.log(personalInfo).team_id
  }
  _logout = async () => {
    await AsyncStorage.removeItem('id_login')
    this.props.navigation.navigate('Login');
  }
  goToUpdateInfo = () => {
    this.props.navigation.navigate('UpdateInfo');
    this.setState({
      onClicked: false
    })
  }
  _goToListTeam = () => {
    console.log('ok')
    this.props.navigation.navigate('ListView');
  }
  showUpdateInfo = () => {
    const { personalInfo } = this.state;
    if (personalInfo.first_name !== null && personalInfo.last_name != null) {
      this.props.navigation.navigate('CreateTeam');
    } else {
      this.setState({
        onClicked: true,
      })
    }

  }
  render() {
    const { onClicked, personalInfo } = this.state;
    const { navigation } = this.props;
    console.log(personalInfo)
    return (
      <View style={styles.container}>
        {onClicked ? <View>
          <Text>Để tạo hoặc tham gia vào đội bóng, bạn cần cập nhật đầy đủ thông tin</Text>
          <TouchableOpacity onPress={this.goToUpdateInfo}>
            <Text>Cập nhật ngay</Text>
          </TouchableOpacity>
        </View> : <View></View>}
        {/* <ImageBackground source={require('./../../assest/images/screen2.jpg')} style={styles.imageBackground}> */}
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={this.showUpdateInfo}
            style={styles.button} >
            {/* <Icon2 name="plus" size={30} color="black" /> */}
            <Text style={styles.text}>Tạo đội bóng mới</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._goToListTeam}
          >
            {/* <Icon name="ios-arrow-dropright" size={30} color="black" /> */}
            <Text style={styles.text}>Tham gia đội</Text>
          </TouchableOpacity>
        </View>

        {/* </ImageBackground> */}
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,

  },
  containerButton: {
    backgroundColor: '#4CAF50',
    width: '70%',
    height: '25 %',
    borderRadius: 40,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff'
  },

});

export default MenuFeature;
