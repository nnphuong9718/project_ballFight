import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Image
}
    from 'react-native';

import logout from './../../../assets/icons/logout.png';

import styles from './styles'

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { baseURL } from '../../../configs';

export default class UpdateInfo extends Component {

    static navigationOptions = {
        headerRight: () => {
            <Image source={logout} style={{ width: 25, height: 25 }} />
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',

        }
    }



    _onSubmit = async () => {
        const id_login = await AsyncStorage.getItem('id_login');
        const { firstName, lastName } = this.state;
        const data = {
            firstName,
            lastName,
            id_login
        };
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/updateInfo', data, config)
            .then((response) => {
                if (response.data === "Error") {
                    this.form.showError('Cập nhật thất bại')
                    // props.onOpenNextScreen('');

                }
                else {
                    console.log(response)
                    this.props.navigation.navigate('MenuFeatures')
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(firstName + " - " + lastName)
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ"
                        placeholderTextColor="#C4BFC0"
                        onChangeText={(firstName) => this.setState({
                            firstName: firstName,
                        })}
                    />
                    <TextInput
                        placeholder="Tên"
                        style={styles.input}
                        placeholderTextColor="#C4BFC0"
                        onChangeText={(lastName) => this.setState({
                            lastName: lastName
                        })}
                    />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity
                        onPress={this._onSubmit}
                        style={styles.button}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
