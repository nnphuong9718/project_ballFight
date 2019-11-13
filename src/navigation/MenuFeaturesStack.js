import { createStackNavigator } from 'react-navigation-stack';
import MenuFeatures from '../scenes/menuFeature/menuFeatures';
import UpdateInfo from '../scenes/menuFeature/updateInfo';
import TeamInformation from '../scenes/TeamInformation'
import ListTeam from '../scenes/listTeam'
import CreateTeam from '../scenes/createTeam'



const MenuFeaturesFeatures = createStackNavigator(
    {
        MenuFeatures,
        UpdateInfo,
        TeamInformation,
        ListTeam,
        CreateTeam
    },
    {
        initialRouteName: 'MenuFeatures',
        defaultNavigationOptions: {
            title: "Ball Fight"
        }
    },

);

export default MenuFeaturesFeatures;
