import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        width: '90%',
        // paddingBottom: 10,
        borderBottomWidth: 0.75,
        borderBottomColor: '#BABAC9',
        alignSelf: 'center',
        fontSize: 15,
        marginBottom: 5,
        paddingLeft: 8,
        // paddingBottom: 5,
    },
    containerInput: {
        // justifyContent:'space-around'
        marginTop: 10,
        marginBottom: 5,
    },
    errorMessage: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    }
})

export default styles;