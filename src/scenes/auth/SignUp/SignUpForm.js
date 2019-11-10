import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Picker,
    ImageBackground,
    KeyboardAvoidingView
}
    from 'react-native';

import styles from './styles';

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rePassword: '',
            email: '',
            error: false,
            errorMessage: '',
        }
    }

    showError = (msg) => {
        this.setState({
            error: true,
            errorMessage: msg,
        })
    }

    getValue = () => {
        const { username, password, rePassword, email, } = this.state;
        console.log(username);
        return { username, password, rePassword, email }
    }
    render() {
        const { error, errorMessage } = this.state;
        return (
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor="#C4BFC0"
                    onChangeText={(username) => this.setState({
                        username: username,
                    })}
                />
                <TextInput
                    placeholder="Mật khẩu"
                    style={styles.input}
                    placeholderTextColor="#C4BFC0"
                    secureTextEntry
                    onChangeText={(password) => this.setState({
                        password: password
                    })}
                />
                <TextInput
                    placeholder="Nhập lại mật khẩu"
                    style={styles.input}
                    placeholderTextColor="#C4BFC0"
                    secureTextEntry
                    onChangeText={(rePassword) => this.setState({
                        rePassword: rePassword
                    })}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="#C4BFC0"
                    onChangeText={(email) => {
                        this.setState({
                            email: email,
                        })
                    }}
                />
                <View style={styles.errorMessage}>
                    {error ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : <Text></Text>}
                </View>
            </View>
        )
    }

}