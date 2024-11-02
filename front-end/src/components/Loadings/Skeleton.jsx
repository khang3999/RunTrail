import React from "react";
import "./Skeleton.css";

function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded-sm ${className}`}></div>;
}

export default Skeleton;
