"use strict";

export const convertLocationData = (data) => {
  return data.map((province) => ({
    key: province.code,
    value: province.name,
  }));
};

export const formatCurrency = (input) => {
  const number = parseInt(input, 10);
  if (isNaN(number)) {
    return "Invalid input";
  }
  return number.toLocaleString("vi-VN") + "đ";
};
