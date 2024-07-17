import { Nodes } from "../nodes";

export interface NodeEditorState {
  nodePosition: Position;
  clickedNodeID: number | "none";
  showComponent: boolean
}
export interface Position {
  top: number;
  left: number;
}
