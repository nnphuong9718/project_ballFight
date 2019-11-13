import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native'
import axios from 'axios';
import { baseURL } from '../../configs';
import plus from '../../assets/icons/plus.png'
import AsyncStorage from '@react-native-community/async-storage'

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }
    _addToTeam = () => {
        const { item, id_login } = this.props;
        console.log(id_login)
        const id = item.id;
        const data = {
            id,
            id_login
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/addToTeam', data, config)
            .then(response => {
                if (response.status === 200) {
                    this.props.goToNextScreen(id)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { item, } = this.props;
        // console.log(item);
        return (
            <View style={styles.container}>
                <View style={styles.teamName}>
                    <Text>{item.id + "/ "}</Text>
                    <Text style={styles.textTeamName}>{item.code_name + " - " + item.name}</Text>
                </View>
                <View style={styles.containerRight}>
                    <View style={styles.winLoseStyle}>
                        {item.win ? <Text style={{ color: 'blue', fontSize: 15 }}>{item.win}</Text> : <Text style={{ color: 'blue' }}>0</Text>}
                        <Text>-</Text>
                        {item.lose ? <Text style={{ color: 'red', fontSize: 15 }}>{item.lose}</Text> : <Text style={{ color: 'red' }}>0</Text>}
                    </View>
                    <TouchableOpacity
                        onPress={this._addToTeam}
                    >
                        <Image source={plus} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4CAF50',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        borderRadius: 30,

    },
    teamName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    textTeamName: {
        fontSize: 15,
    },
    allContainer: {
        flex: 1,
        marginTop: 20,
    },
    winLoseStyle: {
        flexDirection: 'row',
        marginRight: 10,
        // alignItems: 'center',
    },
    containerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    }

})

export default class ListTeam extends Component {
    static navigationOptions = {
        title: 'Danh sách đội',
    }
    constructor(props) {
        super(props);
        this.state = {
            listTeam: [],
        }
    }
    componentDidMount() {

        const config = {
            'Content-Type': 'application/json',
        }
        axios.get(baseURL + '/getListTeam', config)
            .then(response => {
                console.log(response);
                this.setState({
                    listTeam: response.data.rows,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    _goToNextScreen = (id) => {
        this.props.navigation.navigate('TeamInformation', {
            params: id,
        })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.teamName}>
                    <Text>{item.id + "/ "}</Text>
                    <Text style={styles.textTeamName}>{item.code_name + " - " + item.name}</Text>
                </View>
                <View style={styles.containerRight}>
                    <View style={styles.winLoseStyle}>
                        {item.win ? <Text style={{ color: 'blue', fontSize: 15 }}>{item.win}</Text> : <Text style={{ color: 'blue' }}>0</Text>}
                        <Text>-</Text>
                        {item.lose ? <Text style={{ color: 'red', fontSize: 15 }}>{item.lose}</Text> : <Text style={{ color: 'red' }}>0</Text>}
                    </View>
                    <TouchableOpacity
                        onPress={this._addToTeam}
                    >
                        <Image source={plus} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>

            </View>
        )

    }

    render() {
        const { navigation } = this.props;
        const params = JSON.stringify(navigation.getParam('params'))
        console.log(params)
        const { listTeam } = this.state;
        console.log(listTeam);


        return (
            <View style={styles.allContainer} >
                <FlatList
                    data={listTeam}
                    keyExtractor={item => (item.id).toString()}
                    renderItem={({ item }) => <FlatListItem item={item}
                        id_login={params}
                        goToNextScreen={this._goToNextScreen} />}
                ></FlatList>
            </View>
        )
    }
}
