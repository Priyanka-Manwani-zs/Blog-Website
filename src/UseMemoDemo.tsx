import React, { useState, useMemo, useRef } from "react";
import "./Demo.css";

interface UseMemoDemoProps {
  title?: string;
  className?: string;
}

const UseMemoDemo: React.FC<UseMemoDemoProps> = ({
  title = "Interactive Demo",
  className = "",
}) => {
  const [num, setNum] = useState(0);
  const [show, setShow] = useState(false);

  const countNumber = (num: number) => {
    console.log("Running expensive calculation...");
    for (let i = 0; i <= 1000000; i++) {}
    return num * 2;
  };

  const memoizedValue = useMemo(() => countNumber(num), [num]);

  return (
    <section id="demo" className={`demo-section ${className}`}>
      <h2>{title}</h2>
      <div className="demo-container">
        <div className="demo-card">
          <h3>With useMemo</h3>
          <div className="result">Memoized Value: {memoizedValue}</div>
          <button onClick={() => setNum(num + 1)}>Increment</button>
          <button onClick={() => setShow(!show)}>
            {show ? "Clicked" : "Click Me"}
          </button>
          <p className="note">Toggles instantly, no recalculation</p>
        </div>

        <div className="demo-card">
          <h3>Without useMemo</h3>
          <div className="result">Non-Memoized Value: {countNumber(num)}</div>
          <button onClick={() => setNum(num + 1)}>Increment</button>
          <button onClick={() => setTimeout(() => setShow(!show), 1000)}>
            {show ? "Clicked" : "Click Me"}
          </button>
          <p className="note">Toggles with delay due to recalculation</p>
        </div>
      </div>
    </section>
  );
};

export default UseMemoDemo;
