import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Picker,
    ImageBackground,
    KeyboardAvoidingView,
    Button
}
    from 'react-native';

import SignUpForm from './SignUpForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';
import { baseURL } from './../../../configs';


const styles = StyleSheet.create({
    container: {
        flex: 8,
        justifyContent: 'center',
        backgroundColor: '#FFE351'
    },
    inputData: {
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 6,
        backgroundColor: 'white',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },

    welcome: {
        flex: 2,
        justifyContent: 'center',
        marginLeft: 20,
    },

    containerPicker: {
        marginBottom: '20%',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
        color: '#333'
    },
    containerButton: {

    },
    button: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFE351',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryPicker: {
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        // backgroundColor: '#FFE351'
    },
});

class SignUp extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#FFE351',
        },
        headerTintColor: '#fff',
    };
    constructor(props) {
        super(props);
        this.state = {
            position: 0
        }
    }

    _onSubmit = () => {
        const { username, password, rePassword, email } = this.signUpForm.getValue();
        const { position } = this.state;
        if (!username || !password || !email) {
            this.signUpForm.showError('Vui lòng điền đủ thông tin!');
        }
        else if (!/^[a-zA-Z0-9_@.-]{1,255}$/.test(username)) {
            this.signUpForm.showError('Tên đăng nhập không đúng định dạng');
        }
        else if (password !== rePassword) {
            this.signUpForm.showError('Mật khẩu không đồng nhất!');
        } else {
            const data = {
                username,
                password,
                email,
                position
            };
            const config = {
                'Content-Type': 'application/json',
            };
            axios.post(baseURL + '/account/register', data, config)
                .then((response) => {
                    if (response.data === 'error') {
                        this.signUpForm.showError('Đăng ký không thành công!');

                    }
                    else {
                        this.props.navigation.navigate('Login');
                    }
                })
                .catch((error) => {
                    console.warn(error);
                });
        };

    }
    render() {
        const { position } = this.state;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-around'
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableResetScrollToCoords={false}>
                <View style={styles.container}>
                    <View style={styles.welcome}>
                        <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>Tạo tài khoản</Text>
                    </View>

                    <View style={styles.inputData}>
                        <SignUpForm
                            ref={ref => (this.signUpForm = ref)}
                        />
                        <View style={styles.containerPicker}>
                            <Text  style={{ fontSize: 16, color: '#333', fontWeight: 'bold'}}>Chọn ví trí chơi bóng của bạn:</Text>
                            <Picker
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        position: itemValue,
                                    })
                                }}
                                selectedValue={position}
                                style={styles.categoryPicker}
                            >
                                <Picker.Item label="Vui lòng chọn" value="0" />
                                <Picker.Item label="Thủ môn" value="1" />
                                <Picker.Item label="Hậu vệ" value="2" />
                                <Picker.Item label="Tiền vệ" value="3" />
                                <Picker.Item label="Tiền đạo" value="4" />
                            </Picker>
                        </View>
                        <View style={styles.containerButton}>
                            <TouchableOpacity
                                onPress={this._onSubmit}
                                style={styles.button}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
};

export default SignUp;
