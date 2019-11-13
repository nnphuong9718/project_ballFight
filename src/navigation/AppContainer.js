
import { createStackNavigator } from 'react-navigation-stack';
import AuthenticateStack from './AuthenticateStack';
import MenuFeaturesStack from './MenuFeaturesStack';



export const startApp = (signedIn = false) => {
    return createStackNavigator(
        {
            AuthenticateStack,
            MenuFeaturesStack,
        },
        {

            initialRouteName: !signedIn ? 'AuthenticateStack' : 'MenuFeaturesStack',
            // initialRouteName: 'TeamInformationStack',
            defaultNavigationOptions: {
                header: null,
            }

        },
    )
}




