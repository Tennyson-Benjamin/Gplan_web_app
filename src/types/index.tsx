export interface ApiRoom {
  id: number;
  label: string;
  color: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ConvertedRoom {
  corners: number[][];
  width: number;
  height: number;
  area: number;
  label: string;
}

export interface RoomData {
  [key: string]: ApiRoom;
}
