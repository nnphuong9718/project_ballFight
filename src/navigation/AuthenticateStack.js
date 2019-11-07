import { createStackNavigator } from 'react-navigation-stack';
import Login from './../scenes/auth/Login'
import SignUp from '../scenes/auth/SignUp';


const AuthenticateStack = createStackNavigator(
    {
        Login,
        SignUp
    },
    {
        initialRouteName: 'Login', 
    },

);

export default AuthenticateStack;
