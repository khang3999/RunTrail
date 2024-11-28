import React from "react";
import styles from "./Skeleton.module.css";

function Skeleton({ className = "" }) {
  return <div className={`${styles.skeleton} rounded-sm ${className}`}></div>;
}

export default Skeleton;
