import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert
} from "react-native";
import axios from "axios";
import { baseURL } from "../../configs";
import plus from "../../assets/icons/plus.png";
import plus2 from "../../assets/images/plus.png"
import AsyncStorage from "@react-native-community/async-storage";
import listTeam from "../../assets/images/listteam.jpg";
import listTeam2 from "../../assets/images/listTeam2.jpg";
class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_login: 0,
      id_captain: 0
    };
  }
  componentDidMount() {
    // this._checkCaptain()
  }
  _addToTeam = () => {
    this._checkCaptain();
    const type = 1;
    const { id_captain } = this.state;
    console.log("captain: ", id_captain);
    const { item, id_login } = this.props;
    // console.log(id_login)
    // const id = item.id;
    if (id_captain !== 0) {
      const data = {
        id_receiver: id_captain,
        id_sender: id_login,
        type
      };
      const config = {
        "Content-Type": "application/json"
      };
      axios
        .post(baseURL + "/team/requestAddTeam", data, config)
        .then(response => {
          if (response.status === 200) {
            console.log("xin gia nhap thanh cong");
            Alert.alert("Xin gia nhập thành công!");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  _checkCaptain = () => {
    const { item, id_login } = this.props;
    const id_team = item.id;
    console.log(id_team);
    const data = {
      id_team
    };
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(baseURL + "/player/checkCaptain", data, config)
      .then(response => {
        console.log(response);
        this.setState({
          // isCaptain: true,
          id_captain: response.data.rows[0].id
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <View style={styles.container}>
        <View style={styles.teamName}>
          <View style={styles.number}>
            <Text
              style={{
                color: "#333",
                fontWeight: "bold"
              }}
            >
              {item.id}
            </Text>
          </View>
          <Text style={styles.textTeamName}>
            {"  " + item.code_name + " - " + item.name}
          </Text>
        </View>
        <View style={styles.containerRight}>
          <View style={styles.winLoseStyle}>
            {item.win ? (
              <Text bold style={{ color: "blue", fontSize: 15 }}>
                {item.win}
              </Text>
            ) : (
              <Text bold style={{ color: "blue" }}>
                0
              </Text>
            )}
            <Text>{" - "}</Text>
            {item.lose ? (
              <Text bold style={{ color: "red", fontSize: 15 }}>
                {item.lose}
              </Text>
            ) : (
              <Text bold style={{ color: "red" }}>
                0
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => (this._addToTeam, Alert.alert('Đã gửi yêu cầu tham gia tới đội trưởng của team')
)}>
            <Image source={plus2} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class ListTeam extends Component {
  static navigationOptions = {
    title: "Danh sách đội"
  };
  constructor(props) {
    super(props);
    this.state = {
      listTeam: []
    };
  }
  componentDidMount() {
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .get(baseURL + "/team/getListTeam", config)
      .then(response => {
        console.log(response);
        this.setState({
          listTeam: response.data.rows
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;
    const params = JSON.stringify(navigation.getParam("params"));
    console.log(params);
    const { listTeam } = this.state;
    console.log(listTeam);

    return (
      <View style={styles.allContainer}>
        <View style={{ flex: 2, alignItems: "flex-start" }}>
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={listTeam2}
          />
        </View>
        <View style={{ flex: 3, marginBottom: 30 }}>
          <FlatList
            data={listTeam}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <FlatListItem
                item={item}
                id_login={params}
                goToNextScreen={this._goToNextScreen}
              />
            )}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    height: 80,
    borderRadius: 40,
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 1,
    flex: 2
  },
  teamName: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  textTeamName: {
    fontSize: 17,
    // color: '#333'
  },
  allContainer: {
    flex: 1,
    flexDirection: "column"
    // marginTop: 20
  },
  winLoseStyle: {
    flexDirection: "row",
    marginRight: 30
    // alignItems: 'center',
  },
  containerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20
  },
  number: {
    backgroundColor: "#FFE351",
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center"
  }
});
