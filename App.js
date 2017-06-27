import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';


import SearchScreen from './screens/SearchScreen'
import DisplayScreen from './screens/DisplayScreen'


export default App = StackNavigator({
    Search: { screen: SearchScreen },
    Display: { screen: DisplayScreen },
});


AppRegistry.registerComponent('App', () => App);
