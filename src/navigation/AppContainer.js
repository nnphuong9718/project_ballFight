import {  createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AuthenticateStack from './AuthenticateStack';
import MenuFeaturesStack from './MenuFeaturesStack'


const RootStack = createStackNavigator(
    {
        AuthenticateStack,
        MenuFeaturesStack
    },
    {
        initialRouteName: 'AuthenticateStack',
        defaultNavigationOptions :{
            header:null
        }
        
    },
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
