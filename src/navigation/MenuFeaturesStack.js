import { createStackNavigator } from 'react-navigation-stack';
import MenuFeatures from '../scenes/menuFeature'


const MenuFeaturesFeatures = createStackNavigator(
    {
        MenuFeatures,
        
    },
    {
        initialRouteName: 'MenuFeatures',
        defaultNavigationOptions : {
            
        }
    },

);

export default MenuFeaturesFeatures;
