import { createStackNavigator } from 'react-navigation-stack';
import MenuFeatures from '../scenes/menuFeature/menuFeatures';
import UpdateInfo from '../scenes/menuFeature/updateInfo';
import TeamInformation from '../scenes/TeamInformation';
import Notification from '../scenes/TeamInformation/Notification';
import ListTeam from '../scenes/listTeam'
import CreateTeam from '../scenes/createTeam'
import Training from '../scenes/TeamInformation/Training'
import FindOpponent from '../scenes/TeamInformation/FindOpponent'
import TrainingSetting from '../scenes/TeamInformation/Training/SetDateTraining'


const MenuFeaturesFeatures = createStackNavigator(
    {
        MenuFeatures,
        UpdateInfo,
        TeamInformation,
        Notification,
        ListTeam,
        CreateTeam,
        Training,
        FindOpponent,
        TrainingSetting
    },
    {
        initialRouteName: 'MenuFeatures',
        defaultNavigationOptions: {
            title: "Ball Fight"
        }
    },

);

export default MenuFeaturesFeatures;
