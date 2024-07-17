export interface Documents {
  documentID: string;
  name: string;
  floorPlans: Floorplan[];
}
export interface Floorplan {
  id: number;
  rooms: Room[];
}

export interface Room {
  id: number;
  name: string;
  walls?: Wall[];
  assets?: Asset[];
  color?: string;
}

export interface Wall {
  id: string;
  roomId: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  assets?: Asset[];
}
export interface WallWithoutId {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roomId: number;
}
export interface Asset {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: "window" | "door";
  wallId: number;
}
export interface Label {
  x: number;
  y: number;
  text: string;
}
