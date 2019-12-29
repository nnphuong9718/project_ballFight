import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
// import { baseURL } from '../../../configs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import now from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import clock from '../../../../assets/icons/clock.png'
import calendar from '../../../../assets/icons/calendar.png'


export default class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDate: false,
            showTime: false,
            mode: 'date',
            date: '',
            time: '',
        };
    }

    componentDidMount() {

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

    renderFormSetInfo = () => {
        return (
            <View>

            </View>
        )
    }

    // showForm = mode => {
    //     this.setState({
    //         show: true,
    //         mode
    //     })
    // }

    setDate = (event, date) => {

        console.log(date);
        const time = new Date(parseInt(date.getTime))
        const standardDate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
        this.setState({
            showDate: false,
            date: standardDate,
        })

    }
    setTime = (event, date) => {
        console.log(date)
        const standardTime = date.getHours() + ':' + date.getMinutes();
        this.setState({
            showTime: false,
            time: standardTime
        })
    }

    datePicker = () => {
        this.setState({
            showDate: true,
        })
    }

    timePicker = () => {
        this.setState({
            showTime: true,
        })
    }
    getPlace = () => {
        // console.log(this.refs.)
    }

    render() {
        const { showDate, showTime, mode, date, time } = this.state;
        console.log(date);
        console.log(time)

        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Chọn ngày'
                        editable={false}
                        value={date} />
                    <TouchableOpacity onPress={this.datePicker}><Image source={calendar} style={{ width: 25, height: 25 }} /></TouchableOpacity>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Chọn thời gian'
                        editable={false}
                        value={time} />
                    <TouchableOpacity onPress={this.timePicker}><Image source={clock} style={{ width: 25, height: 25 }} /></TouchableOpacity>
                </View>
                {showDate && <DateTimePicker value={new Date()}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />}
                {showTime && <DateTimePicker value={new Date()}
                    mode='time'
                    is24Hour={true}
                    display="default"
                    onChange={this.setTime} />}
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Nhập địa điểm'
                        ref='place'
                        onChangeText={this.getPlace}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.setDateTraining} >
                        <Text>Đặt lịch tập luyện</Text>
                    </TouchableOpacity>
                </View>
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
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
