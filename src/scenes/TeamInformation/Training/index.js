import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
import { baseURL } from '../../../configs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import now from 'moment'


export default class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            pickedDate: false,
            day: 0,
            month: 0,
            year: 0,
            training_date: []
        };
    }

    componentDidMount() {
        this._getTrainingDay();
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
        console.log(date);
        const time = new Date(parseInt(date.date_training))
        console.log(time);
        const standardDate = time.getFullYear() + '-' + (parseInt(time.getMonth()) + 1) + '-' + time.getDate();
        return standardDate;
    }


    render() {
        const { day, month, year, training_date } = this.state;
        console.log(training_date)

        const arrayDate = training_date.map(this.parseDateTraining)
        let markedDates = arrayDate.reduce((c, v) => Object.assign(c, { [v]: { selected: true, marked: true } }), {});
        console.log(markedDates)


        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>

                <Calendar
                    markedDates={markedDates}
                />

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
