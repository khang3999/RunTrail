import React from 'react';
import FilterItem from '../filters/FilterItem';
import PriceFilter from '../filters/PriceFilter';

const SideBarProduct = () => {
	return (
		<div style={{ background: 'white', width: '100%', height: '100%' }}>
			<h1>SideBarProduct</h1>
			{/* Filter by price */}
			<div className="mt-4">
				<FilterItem title={'Giá'}>
					{/* Range price */}
					<div>
						<PriceFilter />
					</div>
				</FilterItem>
			</div>
		</div>
	);
};

export default SideBarProduct;
