import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
interface ResizableProps {
  direction: "h" | "v";
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  const [width, setwidth] = useState(window.innerWidth);
  const [height, setheight] = useState(window.innerHeight);
  const [boxwidth, setboxwidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setheight(window.innerHeight);
        setwidth(window.innerWidth);

        if (window.innerWidth < boxwidth) {
          setboxwidth(window.innerWidth * 75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [boxwidth]);
  let props: ResizableBoxProps;

  if (direction === "h") {
    props = {
      className: "hResize",
      height: Infinity,
      width: boxwidth,
      resizeHandles: ["e"],
      maxConstraints: [width * 0.75, Infinity],
      minConstraints: [width * 0.2, Infinity],
      onResizeStop: (e, data) => {
        setboxwidth(data.size.width);
      },
    };
  } else {
    props = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, height * 0.9],
      minConstraints: [Infinity, 30],
    };
  }
  return <ResizableBox {...props}>{children}</ResizableBox>;
};
