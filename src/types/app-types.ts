import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {USER_TYPE} from '../enums';

export type AppNavigatorRouteParamList = {
  Room: undefined;
  GameBoard: {
    roomId: string;
    userType: USER_TYPE.USER_O | USER_TYPE.USER_X;
  };
  JoinRoom: undefined;
};

export type AppNavigatorProps = NavigationProp<AppNavigatorRouteParamList>;

export type AppNavigatorScreenRoute<
  ScreenName extends keyof AppNavigatorRouteParamList,
> = NativeStackScreenProps<AppNavigatorRouteParamList, ScreenName>['route'];
