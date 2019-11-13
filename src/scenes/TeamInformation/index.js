import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
}
    from 'react-native';
import axios from 'axios';
import { baseURL } from '../../configs'
import AsyncStorage from '@react-native-community/async-storage'
import logout from '../../assets/icons/logout.png';
import EmailForm from './EmailForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

class FlatListItem extends Component {

    render() {
        const { item, team } = this.props;
        console.log(team)
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
                    {item.captain === 1 ? <Text>(C)</Text> : <Text></Text>}
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
            list_player: [],
            teamInfo: {},
            isCaptain: false,
            showForm: false
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ logout: this._logout });
    }
    async componentDidMount() {
        const { navigation } = this.props;
        const params = JSON.stringify(navigation.getParam('params'))
        console.log(params)
        await AsyncStorage.setItem('team_id', params)
        this.fetchData();
        this.getDataTeam();
        this.checkCaptain();
    }
    _logout = async () => {
        let keys = ['id_login', 'team_id'];
        await AsyncStorage.multiRemove(keys);
        this.props.navigation.navigate('Login');
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
        axios.post(baseURL + '/checkCaptain', data, config)
            .then(response => {
                console.log(response)
                if (id_login == response.data.rows[0].id) {
                    this.setState({
                        isCaptain: true
                    })
                }
                else {
                    this.setState({
                        isCaptain: false
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
        axios.post(baseURL + '/getDataTeam', data, config)
            .then(response => {
                this.setState({
                    teamInfo: response.data.rows[0],
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    fetchData = async () => {
        const id_team = await AsyncStorage.getItem('team_id');
        console.log(id_team)
        const data = {
            id_team
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/getListPlayer', data, config)
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
        const { list_player, teamInfo, isCaptain, showForm } = this.state;
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
                        <FlatListItem item={item} />}
                >
                </FlatList>

                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <View>
                        {showForm ? <EmailForm
                            ref={ref => (this.form = ref)} />
                            : <View></View>}
                    </View>
                    <View>
                        {isCaptain ?
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20, }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this._sendMail}>
                                    <Text>Thông báo</Text>
                                </TouchableOpacity>
                            </View> : <View></View>
                        }
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

}
export default TeamInformation;