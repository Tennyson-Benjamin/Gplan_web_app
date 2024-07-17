interface RoomData {
  corners: number[][];
  width: number;
  height: number;
  area: number;
  label: string; // Added label field
}

class Room {
  index: number;
  corners: number[][];
  width: number;
  height: number;
  area: number;
  label: string; // Added label field

  constructor(
    index: number,
    corners: number[][],
    width: number,
    height: number,
    area: number,
    label: string, // Added label parameter
  ) {
    this.index = index;
    this.corners = corners;
    this.width = width;
    this.height = height;
    this.area = area;
    this.label = label; // Assign label
  }
}

export function roomsFromJson(data: { [key: string]: RoomData }): Room[] {
  const rooms: Room[] = [];
  for (const [index, roomData] of Object.entries(data)) {
    const room = new Room(
      parseInt(index, 10),
      roomData.corners,
      roomData.width,
      roomData.height,
      roomData.area,
      roomData.label, // Pass label
    );
    rooms.push(room);
  }
  return rooms;
}
