import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import logout from "./../../../assets/icons/logout.png";
import main from "../../../assets/images/MAINMENU-01.png";
import main2 from "../../../assets/images/mainmenu2.png";
import icon_myteam from "../../../assets/images/icon_myteam.png";
import icon_createTeam from "../../../assets/images/icon_createTeam.png";
import icon_join from "../../../assets/images/icon_join.png";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import { baseURL } from "../../../configs";

class MenuFeature extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Ball Fight",
      headerRight: () => (
        <TouchableOpacity onPress={navigation.getParam("logout")}>
          <Image
            source={logout}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      onClicked: false,
      id_login: 0,
      personalInfo: {},
      errorMessage: "",
      error: false
    };
  }

  async componentWillMount() {}
  async componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
    const { navigation } = this.props;
    const id = await AsyncStorage.getItem("id_login");
    console.log(id);
    if (id === null) {
      const params = JSON.stringify(navigation.getParam("params"));
      console.log(params);
      console.log(params);
      await AsyncStorage.setItem("id_login", params);
      this.getPersonalInfo(params);
    } else {
      this.getPersonalInfo(id);
    }

    this._setTeamID();
  }

  getId = async () => {};

  getPersonalInfo = id_login => {
    const data = {
      id_login
    };
    console.log(id_login);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(baseURL + "/player/getPersonalInfo", data, config)
      .then(response => {
        this.setState({
          personalInfo: response.data.rows[0]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  showError = msg => {
    this.setState({
      error: true,
      errorMessage: msg
    });
  };

  _setTeamID = async () => {
    const { personalInfo } = this.state;
    await AsyncStorage.setItem("team_id", personalInfo.team_id);
    console.log(personalInfo.team_id);
  };
  _logout = async () => {
    await AsyncStorage.removeItem("id_login");
    this.props.navigation.navigate("Login");
    this.setState({
      onClicked: false,
      id_login: 0,
      personalInfo: {},
      errorMessage: "",
      error: false
    });
  };
  goToUpdateInfo = () => {
    this.props.navigation.navigate("UpdateInfo");
    this.setState({
      onClicked: false
    });
  };
  _goToListTeam = async () => {
    const id = await AsyncStorage.getItem("id_login");
    this.getPersonalInfo(id);
    const { personalInfo } = this.state;
    console.log("ok");
    if (personalInfo.first_name !== null && personalInfo.last_name != null) {
      this.props.navigation.navigate("ListTeam", {
        params: personalInfo.id
      });
    } else {
      this.showError(
        "Để tạo hoặc tham gia vào đội bóng, bạn cần cập nhật đầy đủ thông tin."
      );
      this.setState({
        onClicked: true
      });
    }
  };
  _goToMyTeam = async () => {
    const id = await AsyncStorage.getItem("id_login");
    this.getPersonalInfo(id);
    const { personalInfo } = this.state;
    console.log(personalInfo.team_id);
    if (!personalInfo.team_id) {
      this.showError("Bạn chưa tham gia vào team nào");
    } else {
      this.props.navigation.navigate("TeamInformation", {
        params: personalInfo.team_id
      });
    }
  };
  showUpdateInfo = () => {
    const { personalInfo } = this.state;
    if (personalInfo.first_name !== null && personalInfo.last_name != null) {
      this.props.navigation.navigate("CreateTeam");
    } else {
      this.showError(
        "Để tạo hoặc tham gia vào đội bóng, bạn cần cập nhật đầy đủ thông tin."
      );
      this.setState({
        onClicked: true
      });
    }
  };
  render() {
    const { onClicked, personalInfo, error, errorMessage } = this.state;
    console.log(personalInfo);
    return (
      <View style={styles.container}>
        <Text style = {styles.mainMenu} >MAIN MENU</Text>
        <Image source={main2} style={styles.image} />

        {error ? (
          <View>
            <Text>{errorMessage}</Text>
          </View>
        ) : (
          <View></View>
        )}
        {onClicked ? (
          <View>
            <TouchableOpacity onPress={this.goToUpdateInfo}>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "green" }}
              >
                Cập nhật ngay
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
        <View style = {{borderColor: '#0FA00F', borderBottomWidth: 3, marginTop: '10%', marginBottom: '3%', width: '70%'}}></View>
        {/* <ImageBackground source={require('./../../assest/images/screen2.jpg')} style={styles.imageBackground}> */}
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={this._goToMyTeam} style={styles.button}>
            {/* <Icon2 name="plus" size={30} color="black" /> */}
            <View style={styles.subIcon}>
              <Image source={icon_myteam} />
            </View>
            <Text style={styles.text}>Đội bóng của tôi</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.showUpdateInfo} style={styles.button}>
            {/* <Icon2 name="plus" size={30} color="black" /> */}
            <View style={styles.subIcon}>
              <Image source={icon_createTeam} />
            </View>
            <Text style={styles.text}>Tạo đội bóng mới</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this._goToListTeam}>
            {/* <Icon name="ios-arrow-dropright" size={30} color="black" /> */}
            <View style={styles.subIcon}>
              <Image source={icon_join} />
            </View>
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
    justifyContent: "space-around",
    alignItems: "center",

  },
  containerButton: {
    // height: '100%',
    // width: '100%',
    flex: 4,
    // justifyContent: "flex-start",
    // alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15
  },
  button: {
    backgroundColor: "#fff",
    flex: 1,
    width: 0,
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0FA00F",
    paddingHorizontal: 10,
    textAlign: "center",
    marginVertical: "3%",
    marginHorizontal: 8,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6
  },
  text: {
    fontSize: 17,
    color: "#0FA00F",
    textAlign: "center",
    paddingTop: 3
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "40%",
    marginTop: "5%"
  },
  subIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFE351",
    borderColor: '#0FA00F',
    borderWidth:2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent:'center'
  },
  mainMenu: {
    fontSize: 40,
    fontWeight: "bold",
    // color: "black",
    alignSelf: 'flex-start',
    marginTop: '10%',
    color: '#135413',
    zIndex: 3,
    marginLeft: 30,

  }
});

export default MenuFeature;
