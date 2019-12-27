import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Alert, TouchableOpacity, TextInput, Image } from 'react-native'
import * as geolib from 'geolib'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import plus from '../../../assets/icons/plus.png'
import { baseURL } from '../../../configs'
// import { TextInput } from 'react-native-gesture-handler';

export default class FindOpponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findingOpponent: true,
            id_team: 0,
            opponent: [],
            trueOpponent: [],
            position: {},
            distance: 0,
            findPosition: true,
            teamInfo: {},
            matching: false,
            id_captain: 0,
            content: ''
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const id_team = navigation.getParam('id_team')
        const date = navigation.getParam('time_play')
        console.log(id_team);
        console.log(date);
        console.log(new Date(date).getHours())
        this.findCoordinates();
        this.getInfoOpponent();
    }
    loadingOpponent = () => {
        return (
            <View style={styles.horizontal}>
                <Text>Đang tìm đối thủ gần bạn </Text>
                <ActivityIndicator size="small" color="##4CAF50" />
            </View>
        )
    }
    findCoordinates = async () => {
        this.setState({
            findingOpponent: true
        })
        const { navigation } = this.props;
        const id_login = await AsyncStorage.getItem('id_login')
        const id_team = navigation.getParam('id_team')
        const date = navigation.getParam('time_play')
        const hours = (new Date(date)).getHours();
        navigator.geolocation.getCurrentPosition(
            position => {

                this.setState({
                    position: position,
                })

                console.log(position)
                const data = {
                    id_team: id_team,
                    id_captain: id_login,
                    latitude: position.coords.latitude,
                    longtitude: position.coords.longitude,
                    time_play: hours
                }
                const config = {
                    'Content-Type': 'application/json',
                };
                axios.post(baseURL + '/team/findOpponent', data, config)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    };

    findDistance = (position, latitude, longitude) => {

        let distance = geolib.getDistance(position.coords, {
            latitude: latitude,
            longitude: longitude
        })
        this.setState({
            distance: distance
        })
        console.log(distance)

    }


    validateTimeToPlay = (team) => {
        const { navigation } = this.props;
        const date = navigation.getParam('time_play')
        const hours = (new Date(date)).getHours();
        const id_team = navigation.getParam('id_team')
        const distance = this.findDistance(team.lattitude, team.longitude)
        console.log(distance)
        if (team.team_id !== id_team && distance < 1500) {
            console.log('ok')
            this.setState({
                trueOpponent: team,
            })
        }
    }
    getInfoOpponent = () => {
        const { navigation } = this.props;
        const date = navigation.getParam('time_play')
        const hours = (new Date(date)).getHours();
        const team_id = navigation.getParam('id_team')
        const data = {
            team_id: team_id
        }
        const config = {
            'Content-Type': 'application/json',
        }
        axios.post(baseURL + '/team/getInfoOpponent', data, config)
            .then(response => {
                console.log(response)
                if (response.data.rows.length > 0) {
                    this.setState({
                        opponent: response.data.rows
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    stopFind = () => {
        const { opponent, position, } = this.state;
        console.log(position)
        if (opponent.length > 0) {
            this.setState({
                findingOpponent: false
            })
            this.getDataTeam()
            this.findDistance(position, opponent[0].lattitude, opponent[0].longtitude)
        }

    }

    getDataTeam = () => {
        const { opponent } = this.state;
        console.log(opponent)
        if (opponent.length > 0) {
            const data = {
                id_team: opponent[0].team_id,
            }
            const config = {
                'Content-Type': 'application/json',
            };
            axios.post(baseURL + '/team/getDataTeam', data, config)
                .then(response => {
                    console.log(response)
                    this.setState({
                        teamInfo: response.data.rows[0],
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    sendMessage = async () => {
        const { navigation } = this.props;
        const id_login = await AsyncStorage.getItem('id_login')
        console.log(id_login)
        const { id_captain, content } = this.state;
        const team_id = navigation.getParam('id_team')
        console.log(id_captain + content);
        const data = {
            id_sender: id_login,
            id_receiver: id_captain,
            type_request: 3,
            team_id: team_id,
            message: content,
            solved: 0,
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/team/sendMessage', data, config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
    _checkCaptain = () => {
        const { teamInfo } = this.state;
        const id_team = teamInfo.id;
        console.log(id_team)
        const data = {
            id_team
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/player/checkCaptain', data, config)
            .then(response => {

                this.setState({
                    // isCaptain: true,
                    id_captain: response.data.rows[0].id,
                    matching: true,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        const { findingOpponent, opponent, trueOpponent, position, teamInfo, id_captain, matching, distance } = this.state;
        console.log(id_captain)
        console.log(opponent)
        console.log(teamInfo)
        // this.getDataTeam()
        // console.log(trueOpponent)
        return (
            <View style={styles.container} >
                {findingOpponent ? this.loadingOpponent() :
                    < View>

                        <View style={styles.container2}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this._checkCaptain}>
                                <View style={styles.teamName}>
                                    <Text>{teamInfo.id + "/ "}</Text>
                                    <Text style={styles.textTeamName}>{teamInfo.code_name + " - " + teamInfo.name}</Text>
                                </View>
                                <View style={styles.containerRight}>
                                    <View style={styles.winLoseStyle}>
                                        {teamInfo.win ? <Text style={{ color: 'blue', fontSize: 15 }}>{item.win}</Text> : <Text style={{ color: 'blue' }}>0</Text>}
                                        <Text>-</Text>
                                        {teamInfo.lose ? <Text style={{ color: 'red', fontSize: 15 }}>{item.lose}</Text> : <Text style={{ color: 'red' }}>0</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Khoảng cách của 2 đội là: {distance}m</Text>
                        </View>
                        {matching === true ?
                            <View>
                                <View style={styles.containerInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nội dung"
                                        multiline={true}
                                        onChangeText={(content) => this.setState({
                                            content: content
                                        })}
                                    /></View>

                                <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
                                    <Text>Inbox</Text>
                                </TouchableOpacity>
                            </View>
                            : <View></View>
                        }
                    </View>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.stopFind}>
                    <Text>STOP</Text>
                </TouchableOpacity>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    horizontal: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        justifyContent: 'center',
        padding: 10
    },
    container2: {
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
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#4CAF50',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInput: {
        flexDirection: 'row',
        borderBottomWidth: 0.75,
        alignItems: 'center',
        borderBottomColor: 'white',
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        fontSize: 15,
        // color: 'white',
        marginLeft: 10,
    },
})
