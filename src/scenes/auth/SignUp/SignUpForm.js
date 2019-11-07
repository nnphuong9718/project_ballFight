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

const styles = StyleSheet.create({
    input: {
        width: '90%',
        // paddingBottom: 10,
        borderBottomWidth: 0.75,
        borderBottomColor: 'gray',
        alignSelf: 'center',
        fontSize: 15,
    },
    containerInput: {
        // justifyContent:'space-around'
        marginBottom: 20,
    },
    errorMessage: {
        marginTop : 10,
        marginBottom : 10,
    }
})

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            error: false,
            errorMessage: '',
        }
    }

    _onChangeUsername = (username) => {
        this.setState({
            username: username,
        })
    }

    _onChangePassword = (password) => {
        this.setState({
            password: password
        })
    }

    showError = (msg) => {
        this.setState({
            error: true,
            errorMessage: msg,
        })
    }

    getValue = () => {
        const { username, password, email } = this.state;
        console.log(username);
        return { username, password, email }
    }
    render() {
        const {error} = this.state;
        return (
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor="#C4BFC0"
                    onChangeText={(text) => this._onChangeUsername(text)}
                />
                <TextInput
                    placeholder="Mật khẩu"
                    style={styles.input}
                    placeholderTextColor="#C4BFC0"
                    secureTextEntry
                    onChangeText={(text) => this._onChangePassword(text)}
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