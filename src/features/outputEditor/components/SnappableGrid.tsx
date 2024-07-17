import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

interface SnappableGridProps {
    width: number;
    height: number;
    gridSize: number;
}

const SnappableGrid: React.FC<SnappableGridProps> = ({
    width,
    height,
    gridSize,
}) => {
    const canvasRef = useRef<fabric.Canvas | null>(null);

    // ...


    useEffect(() => {
        if (!canvasRef.current) {
            // Initialize Fabric.js canvas
            const canvas = new fabric.Canvas('snappableCanvas', {
                width,
                height,
                selection: false, // Disable object selection
            });

            // Create grid lines
            for (let i = 0; i < width / gridSize; i++) {
                const line = new fabric.Line([i * gridSize, 0, i * gridSize, height], {
                    stroke: '#ddd',
                    selectable: false,
                    evented: false,
                });
                canvas.add(line);
            }

            for (let i = 0; i < height / gridSize; i++) {
                const line = new fabric.Line([0, i * gridSize, width, i * gridSize], {
                    stroke: '#ddd',
                    selectable: false,
                    evented: false,
                });
                canvas.add(line);
            }

            canvasRef.current = canvas;
        }

        const canvas = canvasRef.current;

        // Set up event listeners for snapping
        canvas?.on('object:moving', (e) => {
            const target = e.target as fabric.Object;

            if (target instanceof fabric.Object && target.left !== undefined && target.top !== undefined) {
                target.set({
                    left: Math.round(target.left / gridSize) * gridSize,
                    top: Math.round(target.top / gridSize) * gridSize,
                });
            }
        });
    }, [width, height, gridSize]);

    // ...

    return <canvas id="snappableCanvas" />;
};

export default SnappableGrid;
