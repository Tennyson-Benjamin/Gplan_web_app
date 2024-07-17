type Point = number[];
type Interval = [number, number];

interface Room {
  corners: Point[];
}

export class CustomDataStructure {
  public data: Record<string, Point[]>;

  constructor() {
    this.data = {};
  }

  addPoint(key: string, point: Point): void {
    if (!(key in this.data)) {
      this.data[key] = [point];
    } else {
      this.data[key].push(point);
    }
  }

  getPoints(key: string): Point[] {
    return this.data[key] || [];
  }

  iterate(): void {
    for (let key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        console.log(`Key: ${key}, Points: ${this.data[key]}`);
      }
    }
  }
}

function findUnion(intervals: Interval[]): Interval[] {
  const sortedIntervals = intervals.slice().sort((a, b) => a[0] - b[0]);
  const result: Interval[] = [sortedIntervals[0]];

  for (let i = 1; i < sortedIntervals.length; i++) {
    const currentInterval = sortedIntervals[i];
    const lastInterval = result[result.length - 1];

    if (currentInterval[0] <= lastInterval[1]) {
      lastInterval[1] = Math.max(lastInterval[1], currentInterval[1]);
    } else {
      result.push(currentInterval);
    }
  }

  return result;
}

export function addLines(
  room: Room,
  horizontalLines: CustomDataStructure,
  verticalLines: CustomDataStructure,
): void {
  const rectangle = room.corners;
  console.log(rectangle);
  for (let i = 0; i < rectangle.length; i++) {
    const startPoint = rectangle[i];
    const endPoint = rectangle[(i + 1) % rectangle.length];
    if (startPoint[0] === endPoint[0]) {
      // vertical line
      const keypoint = startPoint[0].toString();
      if (startPoint[1] < endPoint[1]) {
        verticalLines.addPoint(keypoint, [startPoint[1], endPoint[1]]);
      } else {
        verticalLines.addPoint(keypoint, [endPoint[1], startPoint[1]]);
      }
    } else {
      // horizontal line
      const keypoint = startPoint[1].toString();
      if (startPoint[0] < endPoint[0]) {
        horizontalLines.addPoint(keypoint, [startPoint[0], endPoint[0]]);
      } else {
        horizontalLines.addPoint(keypoint, [endPoint[0], startPoint[0]]);
      }
    }
  }
}

export function arrangeLines(
  lines: Point[],
  horizontalLines: CustomDataStructure,
  verticalLines: CustomDataStructure,
): void {
  for (let key of Object.keys(verticalLines.data)) {
    //@ts-ignore
    const data2: Interval[] = [...verticalLines.getPoints(key)];
    const finalData = findUnion(data2);
    finalData.forEach((point) => {
      lines.push([parseInt(key), point[0]]);
      lines.push([parseInt(key), point[1]]);
    });
  }
  for (let key of Object.keys(horizontalLines.data)) {
    //@ts-ignore
    const data: Interval[] = [...horizontalLines.getPoints(key)];
    const finalData = findUnion(data);
    finalData.forEach((point) => {
      lines.push([point[0], parseInt(key)]);
      lines.push([point[1], parseInt(key)]);
    });
  }
}
