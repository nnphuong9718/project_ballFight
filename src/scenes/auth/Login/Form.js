import React, { Component } from "react";
import ball from './../../../assets/icons/ball.png'
import key from './../../../assets/icons/key.png'
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View
} from "react-native";
import { Button } from './../../../components'

interface Props {
    onSubmit?: () => void;
    isLoading?: boolean | undefined;
}


export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
            errorMessage: '',
        }
    }


    onChangeUserName = (username) => {
        this.setState({
            username: username
        })
    }

    onChangePassword = (password) => {
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
        const { username, password } = this.state;
        return { username, password };
    }

    render() {
        const { errorMessage, error } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.containerTextInput}>
                    <Image source={ball} style={styles.iconStyle} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tài khoản"
                        // placeholderTextColor = "#ffffff"
                        onChangeText={(text) => this.onChangeUserName(text)}
                    />
                </View>
                <View style={styles.containerTextInput}>
                    <Image source={key} style={styles.iconStyle} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        // placeholderTextColor = "#ffffff"
                        onChangeText={(text) => this.onChangePassword(text)}
                        secureTextEntry
                    />
                </View>
                <View style={styles.errorMessage}>
                    {error ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : <Text></Text>}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onSubmit}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#9F9999',
        borderBottomWidth: 1,

        justifyContent: 'center',
    },
    input: {
        width: '90%',
        marginLeft: 10,
        fontSize: 15,
    },
    iconStyle: {
        width: 25,
        height: 25
    },
    button: {
        width: '100%',
        backgroundColor: '#4CAF50',
        height: 50,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:10,
    },
    errorMessage: {
        marginTop: 10,
        marginBottom: 10,
    }
})