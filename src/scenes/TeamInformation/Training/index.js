import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
import { baseURL } from '../../../configs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import now from 'moment'
import AsyncStorage from '@react-native-community/async-storage'


export default class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            pickedDate: false,
            day: 0,
            month: 0,
            year: 0,
            training_date: [],
            showInfo: false,
            isCaptain: false
        };
    }

    componentDidMount() {
        this._getTrainingDay();
        this.checkCaptain()
    }

    checkCaptain = async () => {
        const { navigation } = this.props;
        const params = navigation.getParam('params');
        console.log('teamInfo: ', params);
        const id_team = await params.id;
        const id_login = await AsyncStorage.getItem('id_login')
        console.log(id_login)
        const data = {
            id_team
        }
        const config = {
            'Content-Type': 'application/json',
        };
        axios.post(baseURL + '/player/checkCaptain', data, config)
            .then(response => {
                console.log(response)
                if (id_login == response.data.rows[0].id) {
                    this.setState({
                        isCaptain: true,
                        id_captain: response.data.rows[0].id
                    })
                }
                else {
                    this.setState({
                        isCaptain: false,
                        id_captain: response.data.rows[0].id
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    _getTrainingDay = () => {

        const { navigation } = this.props;
        const params = navigation.getParam('params');
        console.log('teamInfo: ', params);
        const data = {
            team_id: params.id,
        }
        const config = {
            'Content-Type': 'application/json',
        }
        // console.log(date)
        axios.post(baseURL + '/team/getTrainingDate', data, config)
            .then(response => {
                console.log('date training >>>>', response)
                // const date = new Date(parseInt(response.data.rows[12].date_training))
                // console.log(date)
                this.setState({
                    training_date: response.data.rows,
                })
            })
            .catch(error => {
                console.log(error);
                // this.props.navigation.navigate('TeamInformation');
            })


    }

    parseDateTraining = (date) => {

        const time = new Date(parseInt(date.date_training))

        const standardDate = time.getFullYear() + '-' + (parseInt(time.getMonth()) + 1) + '-' + time.getDate();
        return standardDate;
    }

    showInfoTrainingDay = () => {
        this.setState({
            showInfo: true,
        })
    }

    setDateTraining = () => {
        this.props.navigation.navigate('TrainingSetting');
    }
    render() {
        const { training_date, showInfo, isCaptain } = this.state;
        // console.log(training_date)
        console.log(isCaptain)

        const arrayDate = training_date.map(this.parseDateTraining)
        // console.log(arrayDate)
        const uniqueArrayDate = new Set(arrayDate);
        const newArray = [...uniqueArrayDate];
        console.log(newArray)
        let markedDates = arrayDate.reduce((c, v) => Object.assign(c, { [v]: { marked: true } }), {});
        // console.log(markedDates)


        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>

                {/* <Calendar
                    markedDates={markedDates}
                    onDayPress={this.showInfoTrainingDay}

                    theme={{
                        selectedDayTextColor: 'green'
                    }}
                /> */}
                {isCaptain ? <View>
                    <TouchableOpacity style={styles.button} onPress={this.setDateTraining} >
                        <Text>Đặt lịch tập luyện</Text>
                    </TouchableOpacity>
                </View> : <View></View>}
                {showInfo ? <View>
                    <Text>Data</Text>
                </View> : <View></View>}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
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
