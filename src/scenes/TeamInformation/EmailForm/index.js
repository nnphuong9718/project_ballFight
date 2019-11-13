import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'


export default class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            content: '',
        }
    }
    getValue = () => {
        const { subject, content } = this.state;
        return { subject, content };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tiêu đề"
                        onChangeText={(subject) => this.setState({
                            subject: subject
                        })}
                    />
                </View>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nội dung"
                        multiline={true}
                        onChangeText={(content) => this.setState({
                            content: content
                        })}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
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
        // color: 'white',
        marginLeft: 10,
    },
})
