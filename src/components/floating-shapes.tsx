"use client";

import { useEffect, useState } from "react";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle" | "hexagon" | "ring";
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  blur: number;
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate random shapes with visible opacity
    const colors = ["#8B9A6B", "#B8A5A0", "#9CAF88", "#7a6b5a"];
    const generatedShapes: Shape[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      type: ["circle", "square", "triangle", "hexagon", "ring"][Math.floor(Math.random() * 5)] as Shape["type"],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 80,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() > 0.7 ? 1 : 0,
    }));
    setShapes(generatedShapes);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
            filter: shape.blur > 0 ? `blur(${shape.blur}px)` : undefined,
          }}
        >
          {shape.type === "circle" && (
            <div 
              className="w-full h-full rounded-full"
              style={{ border: `4px solid ${shape.color}` }} 
            />
          )}
          {shape.type === "ring" && (
            <div 
              className="w-full h-full rounded-full"
              style={{ 
                border: `5px solid ${shape.color}`,
                backgroundColor: `${shape.color}20`
              }} 
            />
          )}
          {shape.type === "square" && (
            <div 
              className="w-full h-full rotate-12"
              style={{ border: `4px solid ${shape.color}` }} 
            />
          )}
          {shape.type === "triangle" && (
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill={`${shape.color}15`}
              stroke={shape.color}
              strokeWidth="4"
            >
              <polygon points="50,10 90,90 10,90" />
            </svg>
          )}
          {shape.type === "hexagon" && (
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill={`${shape.color}15`}
              stroke={shape.color}
              strokeWidth="4"
            >
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
