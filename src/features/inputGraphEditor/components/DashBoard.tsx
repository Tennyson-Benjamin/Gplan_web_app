import React, { useEffect, useState, createContext } from "react";
import { GRID_SNAP } from "../../../config";
import DrawingBoard from "./DrawingBoard";
import { height } from "@mui/system";

// Create a new context and export
export const NameContext = createContext({
  resp: [],
  setResp: ([]: any) => {},
});

// Create a Context Provider
const NameContextProvider = ({ children }: { children: any }) => {
  const [resp, setResp] = useState([]);

  return (
    <NameContext.Provider value={{ resp, setResp }}>
      {children}
    </NameContext.Provider>
  );
};

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      <div className="col-12 title">
        <h1>GPLAN</h1>
        <h3 className="text-primary">
          Double click to insert a new node. Drag between nodes to add an edge
        </h3>
      </div>
      <NameContextProvider>
        <div className="d-flex">
          <div className="px-0">
            <DrawingBoard snap={GRID_SNAP} />
          </div>
        </div>
      </NameContextProvider>
    </>
  );
}
