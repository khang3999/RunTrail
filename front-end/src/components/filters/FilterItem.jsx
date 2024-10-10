'use client';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function FilterItem({ title, children }) {
	const [expand, setExpand] = React.useState(false);
	return (
		<div className="flex items-center justify-center p-2 rounded-lg flex-col border">
			{/* Title */}
			<div className="w-full flex items-start justify-between rounded-lg bg-[#f4f4f4] py-2 px-4">
				<h3 className="uppercase font-semibold">{title}</h3>
				<button
					onClick={() => {
						setExpand(!expand);
					}}
				>
					<FontAwesomeIcon icon={faCaretDown} />
				</button>
			</div>
			{/* Children */}
			<div className={`mt-4 w-full ${expand ? 'block' : 'hidden'}`}>
				{children}
			</div>
		</div>
	);
}

export default FilterItem;
