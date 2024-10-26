
'use client';
import React, { useState, useContext, createContext, useEffect, use } from 'react';

const ProductAttributesContext = createContext();
export function ProductAttributesProvider({ children }) {
    const [attributes, setAttributes] = useState({});
    const spuAttributes = JSON.parse("{\"Size\": [\"S\", \"M\", \"L\", \"XL\"], \"Color\": [\"White\", \"Black\"]}");
	const [listAttrOutOfStockTemp, setListAttrOutOfStockTemp] = useState([]);
	const [listAttrOutOfStock, setListAttrOutOfStock] = useState([]);

	const [data, setData] = useState({
		spuId: 42,
		attributes: {},
	});



	useEffect(() => {
		fetchAttributes();
	},[data]);

	useEffect(() => {
		// TH1
		// data attributes : {Size: "S"}
		// listAttrOutOfStock : [{attribute: "Size", values: ["S"]}, {attribute: "Color", values: ["White"]}]
		// ouput => [{attribute: "Color", values: ["White"]}]
		if (Object.keys(data.attributes).length === 1){
			const firstListAttrOutOfStock = listAttrOutOfStockTemp[0];
			const attributes = Object.keys(data.attributes); // ["Color"]
			const itemKeys = Object.keys(firstListAttrOutOfStock);
			const diff = itemKeys.filter((key) => !attributes.includes(key) && key!=="stock")[0];
			const listTemp = listAttrOutOfStockTemp.filter((item) => {
				return item.stock === 0;
			});

			// get attribute value of listTemp have key is diff
			const values = listTemp.map((item) => {
				return item[diff];
			})

			const result = {
				attribute: diff,
				values: values
			}

			setListAttrOutOfStock([result]);
		}else if (Object.keys(data.attributes).length === 2){
			const listTemp = listAttrOutOfStockTemp.filter((item) => {
				return item.stock === 0;
			});
			console.log("listTemp", listTemp);
			if (listTemp.length === 0) return;
			const firstListAttrOutOfStock = listTemp[0];
			const attributes = Object.keys(data.attributes);
			const itemKeys = Object.keys(firstListAttrOutOfStock);
			const diff = itemKeys.filter((key) => !attributes.includes(key) && key!=="stock")[1];
			// get attribute value of listTemp have key is diff
			const values = listTemp.map((item) => {
				return item[diff];
			})

			const result = {
				attribute: diff,
				values: values
			}

			setListAttrOutOfStock([result]);
		}
	}, [listAttrOutOfStockTemp]);

	 const fetchAttributes = async () => {
		console.log("data");
        const response = await fetch('http://localhost:8008/api/v1/spu/stock-price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (result.statusCode === 200) {
            const {list,skuPrice,totalStock } = result.metadata;
			const listTemp = JSON.parse(list);
			setListAttrOutOfStockTemp(listTemp);
        };
    }
	return (
		<ProductAttributesContext.Provider
			value={{
                attributes,
                setAttributes,
                spuAttributes,
				setData,
				data,
				listAttrOutOfStock,
				setListAttrOutOfStock
            }}
		>
			{children}
		</ProductAttributesContext.Provider>
	);
}
export const useProductAttributesProvider = () => useContext(ProductAttributesContext);

