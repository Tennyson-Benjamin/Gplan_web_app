import React, { useEffect, useRef } from "react";
import Graph from "./components/Graph";

const InputGraphEditorPage = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.title = "InputGraphEditor";

    const handleWheel = function (e: any) {
      if (
        e.ctrlKey &&
        graphRef.current &&
        !graphRef.current.contains(e.target)
      ) {
        e.preventDefault();
      }
    };

    const handleTouchMove = function (e: any) {
      if (
        e.touches.length > 1 &&
        graphRef.current &&
        !graphRef.current.contains(e.target)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  return (
    <div className="d-flex">
      <div className="col-5 px-0" ref={graphRef}>
        <Graph />
        {/* Use GraphWithFabric here */}
      </div>
    </div>
  );
};

export default InputGraphEditorPage;
