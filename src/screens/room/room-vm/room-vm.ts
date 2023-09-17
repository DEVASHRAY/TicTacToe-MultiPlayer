import uuid from 'react-native-uuid';
import {firestore} from '../../../firebase';
import {FIREBASE_COLLECTION} from '../../../enums';
import {useState} from 'react';

export default function roomVM() {
  const [showLoader, setShowLoader] = useState(false);

  const createRoom = async () => {
    let isRoomCreated = false;
    setShowLoader(true);

    try {
      let generateRoomID = uuid.v4();

      const roomCreationRes = await firestore()
        .collection(FIREBASE_COLLECTION.ROOM)
        .doc(String(generateRoomID))
        .set({});
      console.log('Room created successfully', roomCreationRes);
      isRoomCreated = true;
    } catch (err: unknown) {
      console.log('Error in createRoom Function', err);
      isRoomCreated = false;
    } finally {
      setShowLoader(false);
    }

    return isRoomCreated;
  };

  return {
    showLoader,
    createRoom,
  };
}
