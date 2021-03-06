import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert,
    TextInput
}
    from 'react-native';
import axios from 'axios';

import { baseURL } from '../../configs'
import AsyncStorage from '@react-native-community/async-storage'
import logout from '../../assets/icons/logout.png';
import EmailForm from './EmailForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import notification from '../../assets/icons/notification.png';
import DateTimePicker from '@react-native-community/datetimepicker';

class FlatListItem extends Component {

    render() {
        const { item } = this.props;
        let position = item.position === 1 ? 'GK' : item.position === 2 ? 'DF' : item.position === 3 ? 'MF' : 'ST';
        return (
            <View style={styles.container}>
                <View style={styles.namePlayer}>
                    <View>
                        <Text>{position}</Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.first_name + "" + item.last_name}</Text>
                </View>
                <View>
                    <Text>Mail</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    namePlayer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    allContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        // justifyContent: 'space-around'

    },
    title: {
        alignItems: 'center',
        marginBottom: 20
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
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
})



class TeamInformation extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ball Fight',
            headerRight: () => (
                <TouchableOpacity onPress={navigation.getParam('notification')}>
                    <Image
                        source={notification}
                        style={{ width: 25, height: 25, marginRight: 10 }}
                    />
                </TouchableOpacity>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            list_player: [],
            teamInfo: {},
            isCaptain: false,
            showForm: false,
            id_captain: 0,
            setDate: false,
            setTime: false
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ notification: this._notification });

    }
    getTime = (event, date) => {

        this.setState({
            setTime: true,
        })
        // if (date !== undefined) {

        //     this.setState({
        //         setItem: false
        //     })
        // }
    };
    findCoordinates = (event, date) => {

        const { teamInfo } = this.state;
        console.log(teamInfo)

        console.log(date);
        if (date !== undefined) {
            console.log('ok')
            this.setState({
                setTime: false
            })
            this.props.navigation.navigate('FindOpponent', {
                id_team: teamInfo.id,
                time_play: date,
            })

        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const params = JSON.stringify(navigation.getParam('params'))
        await AsyncStorage.setItem('team_id', params)
        this.fetchData();
        this.getDataTeam();
        this.checkCaptain();
    }
    _notification = async () => {
        const id_login = await AsyncStorage.getItem('id_login')
        const { teamInfo } = this.state;
        this.props.navigation.navigate('Notification', {
            params: teamInfo,
            id_login: id_login,
        });
    }

    // }
    showForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }


    _sendMail = () => {
        const { list_player, showForm } = this.state;
        this.showForm();
        if (showForm === true) {
            const { subject, content } = this.form.getValue();
            console.log(subject + content)
            let mailArray = [];
            for (i = 0; i < list_player.length; i++) {
                mailArray.push(list_player[i].email)
            }
            console.log(mailArray);
            const data = {
                mailArray,
                subject,
                content
            };
            const config = {
                'Content-Type': 'application/json',
            };
            axios.post(baseURL + '/sendEmail', data, config)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        // console.log(list_player)
    }

    _trainTeam = () => {
        const { list_player } = this.state;
        const arrayID = list_player.map(this.getIDTeam)
        this.props.navigation.navigate('Training', {
            params: this.state.teamInfo,
            arrayID: arrayID,

        })
    }

    checkCaptain = async () => {
        const id_team = await AsyncStorage.getItem('team_id');
        const id_login = await AsyncStorage.getItem('id_login')
        console.log(id_login)
        const data = {
            id_team
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/player/checkCaptain', data, config)
            .then(response => {
                console.log(response)
                if (id_login == response.data.rows[0].id) {
                    this.setState({
                        isCaptain: true,
                        id_captain: response.data.rows[0].id
                    })
                }
                else {
                    this.setState({
                        isCaptain: false,
                        id_captain: response.data.rows[0].id
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    getDataTeam = async () => {
        const id_team = await AsyncStorage.getItem('team_id');
        console.log(id_team)
        const data = {
            id_team
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/team/getDataTeam', data, config)
            .then(response => {
                this.setState({
                    teamInfo: response.data.rows[0],
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    // _setDate = (event, date) => {


    //     this.setState({
    //         setDate: true,
    //         mode: 'date',
    //     })
    //     console.log(event)
    //     this.props.navigation.navigate('Training', {
    //         arrayID: arrayID,
    //         date: date,
    //     })
    //     // const { teamInfo } = this.state;
    //     // const date_training = (new Date(date)).getTime();
    //     // if (date !== undefined) {
    //     //     const data = {
    //     //         arrayID: arrayID,
    //     //         date_training: date_training,
    //     //         team_id: teamInfo.id,
    //     //         type: 2,
    //     //     }
    //     //     const config = {
    //     //         'Content-Type': 'application/json',
    //     //     }
    //     //     // console.log(date)
    //     //     axios.post(baseURL + '/team/training', data, config)
    //     //         .then(response => {
    //     //             console.log(response)
    //     //             Alert.alert('Đặt lịch tập luyện thành công!')
    //     //             this.setState({
    //     //                 setDate: false
    //     //             })
    //     //         })
    //     //         .catch(error => {
    //     //             console.log(error);
    //     //             // this.props.navigation.navigate('TeamInformation');
    //     //         })
    //     // }

    // }
    getIDTeam = (list_player) => {
        return list_player.id;
    }

    fetchData = async () => {
        const id_team = await AsyncStorage.getItem('team_id');
        const data = {
            id_team
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/team/getListPlayer', data, config)
            .then(response => {
                this.setState({
                    list_player: response.data.rows,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    compare = (a, b) => {
        let aPosition = a.position;
        let bPosition = b.position;
        let comparison = 0;
        if (aPosition > bPosition) {
            comparison = 1;
        } else {
            comparison = -1;
        }
        return comparison;
    }

    render() {
        const { list_player, teamInfo, isCaptain, showForm, id_captain, setDate, setTime } = this.state;
        console.log(setTime)
        const data = list_player.sort(this.compare)
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-around'
                }}
                style={styles.allContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableResetScrollToCoords={false}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{teamInfo.name}</Text>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={item => (item.id).toString()}
                    renderItem={({ item }) =>
                        <FlatListItem
                            item={item}
                            id_captain={id_captain} />}
                ></FlatList>

                <View style={{ flex: 1, justifyContent: 'space-around' }}>


                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20, }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this._trainTeam}>
                            <Text>Lịch tập luyện</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        setTime ? <View>
                            <DateTimePicker
                                mode='time'
                                value={new Date()}
                                onChange={this.findCoordinates} />
                        </View> : <View></View>
                    }
                    {
                        isCaptain ?
                            <View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.getTime}>
                                    <Text>Tìm đối thủ hôm nay</Text>
                                </TouchableOpacity>
                            </View> : <View></View>
                    }
                </View>
            </KeyboardAwareScrollView>
        )
    }

}
export default TeamInformation;