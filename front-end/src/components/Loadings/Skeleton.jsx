import React from 'react';
import './Skeleton.css';

function Skeleton({ className = '' }) {
	return <div className={`skeleton rounded-lg ${className}`}></div>;
}

export default Skeleton;
