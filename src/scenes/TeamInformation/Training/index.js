import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
import { baseURL } from '../../../configs';

export default class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            pickedDate: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {

    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
            pickedDate: true
        });
    }

    _getTrainingDay = () => {
        const { navigation } = this.props;
        const params = navigation.getParam('params');
        console.log('teamInfo: ', params);
    }

    _setDate = () => {
        const { navigation } = this.props;
        const params = navigation.getParam('params');
        console.log('teamInfo: ', params);
        const { selectedStartDate } = this.state;
        const date = Date.parse(selectedStartDate.toString());
        console.log(date);
        const data = {
            date_training: date,
            team_id: params.id,
            type: 2,
        }
        const config = {
            'Content-Type': 'application/json',
        }
        // console.log(date)
        axios.post(baseURL + '/team/training', data, config)
            .then(response => {
                this.props.navigation.navigate('TeamInformation');
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })

    }
    render() {
        const { selectedStartDate } = this.state;
        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>
                <CalendarPicker
                    onDateChange={this.onDateChange}
                    selectedDayColor='green'
                />

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20, }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._setDate}>
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
});
