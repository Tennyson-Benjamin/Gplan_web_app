import { ApiRoom, ConvertedRoom } from "../types";

export function formatLabel(input: string): string {
  const regex = /.\([^)]*\)/;
  const match = input.match(regex);
  if (match) {
    const contentInsideParentheses = match[0].substring(2, match[0].length - 1);
    return contentInsideParentheses;
  }
  return input;
}

export const convertToDxfFormat = (
  rooms: ApiRoom[],
): Record<number, ConvertedRoom> => {
  const convertedRooms: Record<number, ConvertedRoom> = {};

  rooms.forEach((room) => {
    const { id, left, top, width, height, label } = room;
    const corners = [
      [left, top],
      [left, top + height],
      [left + width, top + height],
      [left + width, top],
    ];
    const area = width * height;

    convertedRooms[id] = {
      corners,
      width,
      height,
      area,
      label,
    };
  });

  return convertedRooms;
};
