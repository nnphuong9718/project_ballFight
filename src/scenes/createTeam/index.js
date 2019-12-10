import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
}
    from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import importIcon from '../../assets/icons/import.png'
import axios from 'axios'
import { baseURL } from '../../configs'
import AsyncStorage from '@react-native-community/async-storage';


class CreateTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logoSource: '',
            teamName: '',
            codeTeam: '',
            error: false,
            errMessage: '',
        };
    }

    componentDidMount() {

    }

    showError = (msg) => {
        this.setState({
            error: true,
            errMessage: msg
        })
    }

    _onSubmit = async () => {
        const id_login = await AsyncStorage.getItem('id_login');
        const { codeTeam, teamName } = this.state;
        if (codeTeam.length === 0 || codeTeam.length >= 4) {
            this.showError('Tên viết tắt phải nhỏ hơn 4 ký tự!');
        } else if (teamName.length < 6 || teamName.length > 20) {
            this.showError('Tên đội phải lớn hơn 6 ký tự và nhỏ hơn 20 ký tự!')
        } else {
            const data = {
                id_login,
                codeTeam,
                teamName
            }
            const config = {
                'Content-Type': 'application/json',
            };
            axios.post(baseURL + '/team/createTeam', data, config)
                .then((response) => {
                    if (response.data === 'error') {
                        this.signUpForm.showError('Đăng ký không thành công!');
                    }
                    else {
                        const id_team = response.data.rows[0].id
                        console.log(id_team)
                        this.props.navigation.navigate('TeamInformation', {
                            params: id_team
                        });
                    }
                })
                .catch((error) => {
                    console.warn(error);
                });
        }
    }

    render() {
        console.disableYellowBox = true;
        const { error, errMessage } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>Tạo đội bóng mới</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.containerInput}>
                        {/* <Image source={require('./../../assest/icons/ball.png')} /> */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên viết tắt đội"
                            // placeholderTextColor="white"
                            onChangeText={(text) => this.setState({
                                codeTeam: text,
                            })}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        {/* <Image source={require('./../../assest/icons/ball.png')} /> */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên đội"
                            // placeholderTextColor="white"
                            onChangeText={(text) => this.setState({
                                teamName: text,
                            })}
                        />
                    </View>

                </View>
                <View>
                    {error ? <Text>{errMessage}</Text> : <Text></Text>}
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

        );
    }
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',
        backgroundColor: '#4CAF50',
        paddingTop: 20,
        paddingBottom: 20,
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
    },
    title: {
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'space-around',

    },
    containerLogo: {

        alignItems: 'center',
    },
    buttonLogo: {
    },
    containerInput: {
        flexDirection: 'row',
        borderBottomWidth: 0.75,
        alignItems: 'center',
        borderBottomColor: 'white',
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        fontSize: 15,
        color: 'white',
        marginLeft: 10,
    },
    containerButton: {
        width: '80%',
        alignSelf: 'center',


    },
    buttonCreate: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#FE2E2E',
        borderRadius: 10,
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
});

export default CreateTeam;
