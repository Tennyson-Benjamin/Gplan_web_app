interface Point {
  x: number;
  y: number;
}

export function doLinesIntersect(
  A: Point,
  B: Point,
  C: Point,
  D: Point,
): boolean {
  function ccw(A: Point, B: Point, C: Point): boolean {
    return (C.y - A.y) * (B.x - A.x) >= (B.y - A.y) * (C.x - A.x);
  }

  function pointsEqual(P1: Point, P2: Point): boolean {
    return P1.x === P2.x && P1.y === P2.y;
  }

  // Check if the segments share the starting or ending points.
  if (
    pointsEqual(A, C) ||
    pointsEqual(B, D) ||
    pointsEqual(A, D) ||
    pointsEqual(B, C)
  ) {
    return false;
  }

  // Proceed with the original intersection logic.
  return ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D);
}
