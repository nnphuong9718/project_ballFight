import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    FlatList
} from 'react-native'
import axios from 'axios'
import { baseURL } from '../../../configs';


class FlatFlistItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameSender: '',
            lastNameSender: ''
        }
    }
    componentDidMount() {
        const { item } = this.props;
        this.getPersonalInfo(item.id_sender)
    }

    getPersonalInfo = (id_login) => {
        const { item } = this.props;
        if (item.type_request === 1) {
            const data = {
                id_login
            }
            // console.log(id_login)
            const config = {
                'Content-Type': 'application/json',
            };
            axios.post(baseURL + '/player/getPersonalInfo', data, config)
                .then((response) => {
                    console.log(response)
                    this.setState({
                        firstNameSender: response.data.rows[0].first_name,
                        lastNameSender: response.data.rows[0].last_name,
                    })

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    _addToTeam = () => {
        const answer = 1; const type = 1;
        const { item, team_id } = this.props;
        const data = {
            id_record: item.id_record,
            id_sender: item.id_sender,
            id_team: team_id.id,
            type,
            answer
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/team/addToTeam', data, config)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.props.goToTeamInformation();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderNotification = () => {
        const { item } = this.props;
        switch (item.type_request) {
            case 1:
                return (
                    <View>
                        <View style={{ flexDirection: 'row', flex: 5, }}>
                            <Text>{firstNameSender + lastNameSender}</Text>
                            <Text> xin gia nhập team</Text>
                        </View>
                        <View style={styles.leftPanel}>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={styles.button}
                                    onPress={this._addToTeam}
                                >
                                    <Text>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
                                    <Text>Từ chối</Text>
                                </TouchableOpacity>
                            </View>
                        </View >
                    </View>
                );
            case 2:

                return (
                    <View>
                        <View style={{ flexDirection: 'row', flex: 5, }}>
                            <Text>Bạn có lịch tập vào: </Text>
                            <Text> abcxyz</Text>
                        </View>

                    </View>
                );
            default:
                return (
                    <View>
                        <View style={{ flexDirection: 'row', flex: 5, }}>
                            <Text>{item.team_id}</Text>
                            <Text> muốn thi đấu với team bạn</Text>
                        </View>
                        <View>
                            <Text>Message: {item.message}</Text>
                        </View>
                        <View style={styles.leftPanel}>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={styles.button}
                                // onPress={this._addToTeam}
                                >
                                    <Text>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
                                    <Text>Từ chối</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )

        }
    }
    _cancel = () => {
        this.props.navigation.navigate('TeamInformation')
    }

    render() {
        const { item, team_id } = this.props;
        console.log(team_id);
        const { firstNameSender, lastNameSender } = this.state;
        // console.log(personalInfo)
        console.log(item);
        const date = new Date(parseInt(item.date_training));
        const displayDate = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear()
        return (
            < View style={styles.container} >
                {item.type_request === 1 ?
                    <View>
                        <View style={{ flexDirection: 'row', flex: 5, }}>
                            <Text>{firstNameSender + lastNameSender}</Text>
                            <Text> xin gia nhập team</Text>
                        </View>
                        <View style={styles.leftPanel}>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={styles.button}
                                    onPress={this._addToTeam}
                                >
                                    <Text>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={this._cancel}>
                                    <Text>Từ chối</Text>
                                </TouchableOpacity>
                            </View>
                        </View >
                    </View> : item.type_request === 2 ? <View>
                        <View style={{ flexDirection: 'row', flex: 5, }}>
                            <Text>Bạn có lịch tập vào: </Text>
                            <Text> {displayDate}</Text>
                        </View>

                    </View> :
                        item.type_request === 3 ? <View>
                            <View style={{ flexDirection: 'row', flex: 5, }}>
                                <Text>Team số {item.team_id}</Text>
                                <Text> muốn thi đấu với team bạn</Text>
                            </View>
                            <View>
                                <Text>Message: {item.message}</Text>
                            </View>
                            <View style={styles.leftPanel}>
                                <View style={styles.containerButton}>
                                    <TouchableOpacity style={styles.button}
                                    // onPress={this._addToTeam}
                                    >
                                        <Text>Đồng ý</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.containerButton}>
                                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
                                        <Text>Từ chối</Text>
                                    </TouchableOpacity>
                                </View>
                            </View >
                        </View> : <View></View>
                }
            </View >


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        borderBottomWidth: 1,
    },
    leftPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 2,
    },
    containerButton: {
        alignItems: 'center',
        width: '50%'
        // flex: 2,
    },
    button: {
        width: '100%',
        height: '80%',
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNotification: [],
        }
    }
    componentWillMount() {
        this.getNotification();
    }
    componentDidMount() {


    }

    _goToTeamInformation = () => {
        this.props.navigation.navigate('MenuFeatures')
    }
    getNotification = () => {
        const { navigation } = this.props;
        const params = navigation.getParam('params')
        const id_login = navigation.getParam('id_login');
        console.log(id_login)
        const data = {
            id_receiver: id_login
        };
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/team/getNotification', data, config)
            .then(response => {
                console.log(response);
                this.setState({
                    listNotification: response.data.rows,
                    team_id: params,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    renderNotification = () => {
        console.log('render')
        const { listNotification, team_id } = this.state;
        return (
            <FlatList
                data={listNotification}
                keyExtractor={item => (item.id_record).toString()}
                renderItem={({ item }) =>
                    <FlatFlistItem
                        item={item}
                        team_id={team_id}
                        goToTeamInformation={this._goToTeamInformation} />}
            ></FlatList>
        )

    }
    render() {
        const { listNotification } = this.state;
        // const data = listNotification
        // console.log(listNotification.map())
        return (
            <View>
                {this.renderNotification()}
            </View>
        )
    }
}
