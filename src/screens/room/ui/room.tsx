import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Button} from '../../../components';
import roomVM from '../room-vm/room-vm';
import LoaderOverlay from '../../../components/loader-overlay';
import {useNavigation} from '@react-navigation/native';
import {AppNavigatorProps} from '../../../types/app-types';
import {HandleCreateRoomParams} from '../interface/room-interface';
import {ROOM_TYPE, USER_TYPE} from '../../../enums';

export default function Room() {
  const navigation = useNavigation<AppNavigatorProps>();

  const {showLoader, createRoom} = roomVM();

  const handleRoom = async ({roomType}: HandleCreateRoomParams) => {
    if (roomType === ROOM_TYPE.JOIN) {
      navigation.navigate('JoinRoom');
      return;
    }

    let roomId = await createRoom();
    console.log('roomId', roomId);

    if (roomId) {
      navigation.navigate('GameBoard', {
        roomId: String(roomId || ''),
        userType: USER_TYPE.USER_X,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <LoaderOverlay visible={showLoader} textContent="Please wait..." />
      <Button
        title="Create Room"
        onPress={() => handleRoom({roomType: ROOM_TYPE.CREATE})}
        buttonStyle={[styles.button]}
      />

      <Button
        title="Join Room"
        onPress={() => handleRoom({roomType: ROOM_TYPE.JOIN})}
        buttonStyle={[styles.button, styles.joinRoomButton]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 200,
  },
  joinRoomButton: {
    marginTop: 40,
  },
});
