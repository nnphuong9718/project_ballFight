import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
}
  from 'react-native';


class MenuFeature extends Component {
    static navigationOptions = {
        title :'Ball Fight',
    };
  render() {
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={require('./../../assest/images/screen2.jpg')} style={styles.imageBackground}> */}
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} >
              {/* <Icon2 name="plus" size={30} color="black" /> */}
              <Text style={styles.text}>Tạo đội bóng mới</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button}>
              {/* <Icon name="ios-arrow-dropright" size={30} color="black" /> */}
              <Text style={styles.text}>Tham gia đội</Text>
            </TouchableOpacity>
          </View>
          
        {/* </ImageBackground> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  containerButton: {
    backgroundColor: 'white',
    width: '80%',
    height: '25 %',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },

});

export default MenuFeature;
