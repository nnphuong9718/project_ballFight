import { createStackNavigator } from 'react-navigation-stack';
import ListView from '../scenes/listTeam'

const ListTeamStack = createStackNavigator(
    {
        ListView
    },
    {
        initialRouteName: 'ListView',
        defaultNavigationOptions: {
            title: "Ball Fight"
        }
    },

);

export default ListTeamStack;