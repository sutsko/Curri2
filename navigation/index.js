import {createAppContainer, createStackNavigator} from 'react-navigation';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';
import Explore from '../screens/Explore';
import Browse from '../screens/Browse';
import Product from '../screens/Product';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

import {theme} from '../constants'

const screens = createStackNavigator({
Welcome,
Login,
Signup,
Forgot,
Explore, 
Browse, 
Product,
Settings,
Profile
}, {
    defaultNavigationOptions:{
        headerStyle: {
            height: theme.sizes.base *4,
            backgroundColor: theme.colors.white,
            borderBottomColor: "transparent",
            elevation: 0, 
        },
         
        headerBackTitle: null,
        headerLeftContainerStyle: {
            alignItems:'center',
            marginLeft: theme.sizes.base*2,
            paddingRight: theme.sizes.base,
            borderRadius: 100,
            marginBottom: 10,
            marginTop: 10,
            marginRight: 10,
            marginLeft: 17   
        },
        headerRightContainerStyle: {
            alignItems:'center',
            paddingRight: theme.sizes.base,
        },
    }
});

export default createAppContainer(screens);