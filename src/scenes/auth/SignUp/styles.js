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
        marginBottom: 20,
    },
    errorMessage: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    }
})

export default styles;