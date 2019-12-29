import { StyleSheet } from 'react-native';

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
        backgroundColor: '#FFEB84',
        width: '90%',
        height: '30%',
        borderRadius: 10,
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 0,
        justifyContent: 'center',
        marginVertical: 30,
        flex: 3,
    },
    errorMessage: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#0FA00F',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles;