import React, { useEffect, useState } from 'react';

function Overlay({ visible = false, onClose = () => {} }) {
	const [show, setShow] = useState(visible);

	useEffect(() => {
		if (visible) {
			setShow(true);
		} else {
			// Delay hiding to allow transition to complete
			const timeout = setTimeout(() => setShow(false), 300);
			return () => clearTimeout(timeout);
		}
	}, [visible]);

	return (
		<div
			className={`fixed bg-[rgba(0,0,0,0.5)] transition-opacity duration-300 ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
			style={{
				backdropFilter: 'blur(5px)',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 9999,
				visibility: show ? 'visible' : 'hidden',
			}}
			onClick={onClose}
		></div>
	);
}

export default Overlay;
