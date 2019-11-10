import { createStackNavigator } from 'react-navigation-stack';
import MenuFeatures from '../scenes/menuFeature/menuFeatures';
import UpdateInfo from '../scenes/menuFeature/updateInfo';



const MenuFeaturesFeatures = createStackNavigator(
    {
        MenuFeatures,
        UpdateInfo
    },
    {
        initialRouteName: 'MenuFeatures',
        defaultNavigationOptions: {
            title: "Ball Fight"
        }
    },

);

export default MenuFeaturesFeatures;
