import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JoinRoom, Room} from '../screens/room/ui';
import {Board} from '../screens/Board/ui';
import {AppNavigatorRouteParamList} from '../types/app-types';

const {Navigator, Screen} =
  createNativeStackNavigator<AppNavigatorRouteParamList>();

export default function AppNavigation() {
  return (
    <Navigator initialRouteName="Room" screenOptions={{headerShown: false}}>
      <Screen name="Room" component={Room} />
      <Screen name="GameBoard" component={Board} />
      <Screen name="JoinRoom" component={JoinRoom} />
    </Navigator>
  );
}
