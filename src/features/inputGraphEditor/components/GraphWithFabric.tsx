import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const GraphWithFabric: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
      });
      newCanvas.setBackgroundColor(
        "lightgray",
        newCanvas.renderAll.bind(newCanvas),
      );
      setCanvas(newCanvas);
    }
  }, []);

  useEffect(() => {
    if (!canvas) return;

    let isDrawing = false;
    let originNode: fabric.Circle | null = null;
    let line: fabric.Line | null = null;

    canvas.on("mouse:down", (options: fabric.IEvent) => {
      const { target } = options;
      if (target && target instanceof fabric.Circle) {
        isDrawing = true;
        originNode = target;
        const pointer = canvas.getPointer(options.e);

        line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          strokeWidth: 2,
          fill: "black",
          stroke: "black",
          originX: "center",
          originY: "center",
          selectable: false,
          evented: false,
        });

        canvas.add(line);
      }
    });

    canvas.on("mouse:move", (options: fabric.IEvent) => {
      if (!isDrawing || !line) return;
      const pointer = canvas.getPointer(options.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    });

    canvas.on("mouse:up", (options: fabric.IEvent) => {
      if (!isDrawing || !line || !originNode) return;
      const { target } = options;
      isDrawing = false;

      if (target && target instanceof fabric.Circle && target !== originNode) {
        const targetCenter = target.getCenterPoint();
        line.set({ x2: targetCenter.x, y2: targetCenter.y });
      } else {
        canvas.remove(line);
      }

      line = null;
      originNode = null;
      canvas.renderAll();
    });

    canvas.on("mouse:dblclick", (options: fabric.IEvent) => {
      const pointer = canvas.getPointer(options.e);
      const circle = new fabric.Circle({
        radius: 20,
        fill: "blue",
        left: pointer.x,
        top: pointer.y,
        originX: "center",
        originY: "center",
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
      });

      canvas.add(circle);
    });

    return () => {
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
      canvas.off("mouse:dblclick");
    };
  }, [canvas]);

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={600} />
    </div>
  );
};

export default GraphWithFabric;
