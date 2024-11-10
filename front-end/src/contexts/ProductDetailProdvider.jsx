"use client";
import React, { useState, useContext, createContext, useEffect } from "react";
import AxiosInstance from '@/utils/axiosInstance';

const ProductDetailContext = createContext();
export function ProductDetailProvider({ children }) {
  const [attributes, setAttributes] = useState({});
  const [spuAttributes, setSpuAttributes] = useState([]);
  const [listAttrOutOfStockTemp, setListAttrOutOfStockTemp] = useState([]);
  const [listAttrOutOfStock, setListAttrOutOfStock] = useState([]);
  const [totalStock, setTotalStock] = useState(null);
  const [skuPrice, setSkuPrice] = useState("");
  const [hiddenQuantity, setHiddenQuantity] = useState(false);
  const [skuId, setSkuId] = useState("");

  const [data, setData] = useState({
    spuId: "",
    attributes: {},
  });

  useEffect(() => {
    fetchAttributes();
    handleHiddenQuantity();
  }, [data]);

  useEffect(() => {
    // TH1
    // data attributes : {Size: "S"}
    // listAttrOutOfStock : [{attribute: "Size", values: ["S"]}, {attribute: "Color", values: ["White"]}]
    // ouput => [{attribute: "Color", values: ["White"]}]
    if (Object.keys(data.attributes).length === 1) {
      const firstListAttrOutOfStock = listAttrOutOfStockTemp[0];
      const attributes = Object.keys(data.attributes); // ["Color"]
      const itemKeys = Object.keys(firstListAttrOutOfStock);
      const diff = itemKeys.filter(
        (key) => !attributes.includes(key) && key !== "stock",
      )[0];
      const listTemp = listAttrOutOfStockTemp.filter((item) => {
        return item.stock === 0;
      });

      // get attribute value of listTemp have key is diff
      const values = listTemp.map((item) => {
        return item[diff];
      });

      const result = {
        attribute: diff,
        values: values,
      };

      setListAttrOutOfStock([result]);
    } else if (Object.keys(data.attributes).length === 2) {
      const listTemp = listAttrOutOfStockTemp.filter((item) => {
        return item.stock === 0;
      });
      console.log("listTemp", listTemp);
      if (listTemp.length === 0) return;
      const firstListAttrOutOfStock = listTemp[0];
      const attributes = Object.keys(data.attributes);
      const itemKeys = Object.keys(firstListAttrOutOfStock);
      const diff = itemKeys.filter(
        (key) => !attributes.includes(key) && key !== "stock",
      )[1];
      // get attribute value of listTemp have key is diff
      const values = listTemp.map((item) => {
        return item[diff];
      });

      const result = {
        attribute: diff,
        values: values,
      };

      setListAttrOutOfStock([result]);
    }
  }, [listAttrOutOfStockTemp]);

  const fetchAttributes = async () => {
    const { spuId } = data;
    if (spuId) {
      AxiosInstance.post(`spu/stock-price`, { ...data }).then((response) => {
        const data = response.data;
        if (data.statusCode === 200) {
          const { list, skuPrice, totalStock,skuId } = data.metadata;
          const listTemp = JSON.parse(list);
          setListAttrOutOfStockTemp(listTemp);
          setTotalStock(totalStock);
          setSkuPrice(skuPrice);
          setSkuId(skuId);
        }
      }).catch((error) => {
        console.error("Error fetching attributes", error);
      });
    }
  };

  const handleHiddenQuantity = () => {
    // get all key of attributes
    const totalKeyAttributes = Object.keys(data.attributes).length;
    const totalKeySpuAttributes = Object.keys(spuAttributes).length;
    console.log("totalKeyAttributes", Object.keys(data.attributes));
    console.log("totalKeySpuAttributes", Object.keys(spuAttributes));
    if (totalKeyAttributes === totalKeySpuAttributes) {
      setHiddenQuantity(true);
    } else {
      setHiddenQuantity(false);
    }
  };

  return (
    <ProductDetailContext.Provider
      value={{
        attributes,
        setAttributes,
        spuAttributes,
        setData,
        data,
        listAttrOutOfStock,
        setListAttrOutOfStock,
        setSpuAttributes,
        totalStock,
        skuPrice,
        hiddenQuantity,
        skuId,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
}
export const useProductDetailProvider = () => useContext(ProductDetailContext);
