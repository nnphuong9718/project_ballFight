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
import logout from '../../assets/icons/logout.png'


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
                <View style={{ alignSelf: 'center' }}>
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
        justifyContent: 'space-between'
    },
    namePlayer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    allContainer: {
        flex: 1,
        margin: 20,

    },
    title: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    }
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
            teamInfo: {}
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
    }
    _logout = async () => {
        let keys = ['id_login', 'team_id'];
        await AsyncStorage.multiRemove(keys);
        this.props.navigation.navigate('Login');
    }

    // }

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
        const { list_player, teamInfo } = this.state;
        console.log(list_player)
        console.log(teamInfo)
        const data = list_player.sort(this.compare)
        return (
            <View style={styles.allContainer}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{teamInfo.name}</Text>
                </View>
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={item => (item.id).toString()}
                        renderItem={({ item }) =>
                            <FlatListItem item={item} />}
                    >
                    </FlatList>
                </View>
            </View>
        )
    }

}
export default TeamInformation;