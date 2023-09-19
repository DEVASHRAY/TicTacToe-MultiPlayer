import {ROOM_TYPE} from '../../../enums';

export interface HandleCreateRoomParams {
  roomType: ROOM_TYPE.CREATE | ROOM_TYPE.JOIN;
}

export interface  JoinRoomParams {
    roomId : string
}
