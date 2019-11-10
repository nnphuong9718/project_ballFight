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

class FlatListItem extends Component {

    render() {
        const { item } = this.props;
        console.log(item);
        return (
            <View style={styles.container}>
                <View style={styles.teamName}>
                    <Text style={styles.textTeamName}>{item.code_name + " - " + item.name}</Text>
                </View>
                <View style={styles.containerRight}>
                    <View style={styles.winLoseStyle}>
                        {item.win ? <Text style={{ color: 'blue', fontSize: 15 }}>{item.win}</Text> : <Text style={{ color: 'blue' }}>0</Text>}
                        <Text>-</Text>
                        {item.lose ? <Text style={{ color: 'red', fontSize: 15 }}>{item.lose}</Text> : <Text style={{ color: 'red' }}>0</Text>}
                    </View>
                    <TouchableOpacity>
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

        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        borderRadius: 30,

    },
    teamName: {
        justifyContent: 'center',
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

    render() {
        const { listTeam } = this.state;
        console.log(listTeam);

        console.log()
        return (
            <View style={styles.allContainer} >
                <FlatList
                    data={listTeam}
                    keyExtractor={item => (item.id).toString()}
                    renderItem={({ item }) => <FlatListItem item={item} />}
                ></FlatList>
            </View>
        )
    }
}
