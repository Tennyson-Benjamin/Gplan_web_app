import React from "react";
import Graph from "./components/Graph";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const OutputEditorPage = () => {
  const draw = useSelector(
    (store: RootState) => store?.outputEditorButtonState?.drawLine,
  );
  return (
    <>
      <TopNav />
      <Graph/>
      <BottomNav />
    </>
  );
};

export default OutputEditorPage;
