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

export default function Room() {
  const {showLoader, createRoom} = roomVM();

  const handleCreateRoom = async () => {
    let isRoomCreated = await createRoom();
    console.log('isRoomCreated', isRoomCreated);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <LoaderOverlay visible={false} />
      <Button
        title="Create Room"
        onPress={handleCreateRoom}
        buttonStyle={[styles.button]}
      />

      <Button
        title="Join Room"
        onPress={handleCreateRoom}
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
