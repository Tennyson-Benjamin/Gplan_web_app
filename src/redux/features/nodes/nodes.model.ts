export interface NodesState {
  nodes: Nodes[];
  links: Links[];
}
export interface Nodes {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
  width: MaxMin ,
  height: MaxMin,
  ratio: MaxMin
}
export interface Links {
  source: number;
  target: number;
}

export interface MaxMin {
  max: number | "none" ;
  min: number| "none" ;
}

