import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import background from "./../../../assets/images/background.jpg";
import Form from "./Form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Button } from "./../../../components";
// import logo from './../../../assets/images/logo.png'
import logo from "./../../../assets/images/fbBackgound.png";
import { baseURL } from "./../../../configs";

import axios from "axios";
// import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";

class Login extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = async () => {
    console.log(baseURL);
    const { username, password } = this.form.getValue();
    if (!password) {
      this.form.showError("Không được bỏ trống mật khẩu.");
    } else if (!/^[a-zA-Z0-9_@.-]{1,255}$/.test(username)) {
      this.form.showError("Tên đăng nhập không đúng định dạng");
    } else {
      const data = {
        username,
        password
      };
      const config = {
        "Content-Type": "application/json"
      };
      axios
        .post(baseURL + "/account/loginService", data, config)
        .then(response => {
          if (response.data === "Error") {
            this.form.showError("Sai tên đăng nhập hoặc mật khẩu");
            // props.onOpenNextScreen('');
          } else {
            console.log(response.data.rows[0].id);
            this.props.navigation.navigate("MenuFeatures", {
              params: response.data.rows[0].id
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  _goToSignUpScreen = () => {
    this.props.navigation.navigate("SignUp");
  };
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-around"
        }}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={false}
      >
        <View style={{ flex: 5, justifyContent: "space-around" }}>
          <View
            style={{
              flex: 4,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Text style={styles.slogan}>BALL FIGHT</Text>
            <Text style={styles.subSlogan}>Tận hưởng đam mê bóng đá</Text>

            <Image source={logo} style={styles.logo} />
          </View>
          <View style={{ flex: 1 }}>
            {/* <View style={styles.containerForm}> */}
            <View style={{ flex: 2 }}>
              <Form ref={ref => (this.form = ref)} onSubmit={this.onSubmit} />
            </View>
            {/* <Button title="Đăng ký" /> */}
            <View style={styles.signUp}>
              <Text style={styles.text}>Chưa có tài khoản? </Text>
              <TouchableOpacity onPress={this._goToSignUpScreen}>
                <Text style={{ fontSize: 15, color: "#135413" }}>
                  Đăng ký ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    // justifyContent:'space-around',
    marginLeft: 30,
    marginRight: 30
  },
  signUp: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  text: {
    fontSize: 15
  },
  slogan: {
    fontSize: 40,
    fontWeight: "bold",
    // color: "black",
    alignSelf: 'flex-start',
    marginTop: '15%',
    color: '#135413',
    zIndex: 3

  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    // height:'30%',
    height: "80%",
    alignSelf: "center",
    marginBottom: '5%',
    marginTop: '20%',
    zIndex: 1
  },
  containerLogo: {
    // flex: 1,
    // justifyContent:'space-around'
  },
  subSlogan: {
    fontSize: 15,
    // fontWeight: "bold",
    // color: "black",
    alignSelf: 'flex-start',
    marginTop: '20%',
    color: '#135413',
    zIndex: 3
  }
});
