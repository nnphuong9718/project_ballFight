
import { createStackNavigator } from 'react-navigation-stack';
import AuthenticateStack from './AuthenticateStack';
import MenuFeaturesStack from './MenuFeaturesStack';
import CreateTeamStack from './CreateTeamStack';
import ListTeamStack from './ListTeamStack';
import TeamInformationStack from './TeamInformationStack'


export const startApp = (signedIn = false, hasTeam = false) => {
    return createStackNavigator(
        {
            AuthenticateStack,
            MenuFeaturesStack,
            CreateTeamStack,
            ListTeamStack,
            TeamInformationStack
        },
        {

            initialRouteName: !signedIn ? 'AuthenticateStack' : !hasTeam ? 'MenuFeaturesStack' : 'TeamInformationStack',
            // initialRouteName: 'AuthenticateStack',
            defaultNavigationOptions: {
                header: null,
            }

        },
    )
}




