import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {PROCEED_ARROW_SVG} from '../../../svg';
import {color, rgba} from '../../../utils';
import roomVM from '../room-vm/room-vm';
import {useNavigation} from '@react-navigation/native';
import {AppNavigatorProps} from '../../../types/app-types';
import LoaderOverlay from '../../../components/loader-overlay';
import {errorToast} from '../../../helpers/toast';
import {USER_TYPE} from '../../../enums';

export default function JoinRoom() {
  const navigation = useNavigation<AppNavigatorProps>();

  const [roomId, setRoomId] = useState('93133699-8b76-4b31-9d20-3f8612ca96ac');

  const {joinRoom, showLoader} = roomVM();

  const handleJoinRoom = async () => {
    let doesRoomExist = await joinRoom({roomId});

    if (doesRoomExist) {
      navigation.navigate('GameBoard', {
        roomId,
        userType: USER_TYPE.USER_O,
      });
      return;
    }

    errorToast({
      toastTitle: 'Please enter a correct Room Id',
    });

    console.log('doesRoomExist', doesRoomExist);
  };

  return (
    <View style={[styles.container]}>
      <LoaderOverlay visible={showLoader} textContent="Verifying Room Id" />
      <View style={[styles.flexView]}>
        <TextInput
          value={roomId}
          onChangeText={setRoomId}
          placeholder="Enter the room id here"
          placeholderTextColor={rgba['rgba(225, 225, 225, 0.20));']}
          style={[styles.roomTextInput]}
        />
        <TouchableOpacity onPress={handleJoinRoom}>
          <PROCEED_ARROW_SVG disabled={!(roomId.length > 9)} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomTextInput: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: color['#FFFFFF'],
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: color['#FFFFFF'],
    textDecorationLine: 'none',
  },
});
