'use client';
import React, { useEffect, useState } from 'react'
import { metadata } from '../layout';

export default function DetailProduct() {

  const [product, setProduct] = useState({
    spuName: '',
    brand: {
      brandName: ''
    },
    spuAttributes: {}
  });

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    const response = await fetch('http://localhost:8008/api/v1/spu?id=2')
    const data = await response.json()
    if (data.statusCode === 200) {
      const { spuName, brand, spuAttributes } = data.metadata;
      setProduct({
        spuName,
        brand,
        spuAttributes: JSON.parse(spuAttributes)
      })
    }
  }

  const handleAttributeChange = () => {
    console.log('change attribute')
  }

  return (
    <div>
      <div className='md:container md:px-[200px] mt-3 py-3 bg-slate-300 h-[100px]'>
        <p><span>Trang chủ </span> <span>Đồ Nam</span>  <span>Áo Chạy Bộ Nam</span></p>
      </div>
      <div className='px-[200px] mt-3 h-[300px] grid grid-cols-2 gap-4'>
        <div className='bg-slate-200'>
        </div>
        <div>
          <h4 className='text-[20px] mb-3'>{product.spuName}</h4>
          <div className='flex items-center mb-2'>
            <span className='text-gray-400 text-[14px]'>Thương hiệu:</span>
            <span className='ms-[20px]'>{product.brand.brandName}</span>
          </div>
          <div className='mb-3'>
            <ProductPriceDetail price={100000} isSale={true} />
          </div>
          <div>
            {
              Object.keys(product.spuAttributes).map((key, index) => {
                return <ProductAttributeItem key={index} title={key} values={product.spuAttributes[key]}/>
              })
            }
          </div>
          <div>
            <InputQuantity quantity={1} />
          </div>
          <div>
            Them gio hang
          </div>
        </div>
      </div>
    </div>
  )
}


function ProductAttributeItem({ title, values}) {
  return (
    <ProductAttribute title={title} >
      <div className='grid grid-cols-3 gap-2'>
      {
        values.map((item, index) => {
          return <ProductAttributeItemValue  key={index} value={item} />
        })
      }
      </div>
    </ProductAttribute>
  )
}

function ProductAttributeItemValue({ value }) {
  const [selected, setSelected] = useState(false);
  return (
    <button onClick={()=>setSelected(!selected)} className={`text-[14px] text-center px-2 py-1 border hover:text-orange-500 hover:border-orange-500 ${selected && "text-orange-500 border-orange-500"}`}>{value}</button>
  )
}

function ProductPriceDetail({ price, isSale = false }) {
  return (
    <div className='px-3 py-3 flex gap-2 bg-slate-100 rounded items-center'>
      <ProductPrice price={price} lineThrough={isSale} />
      {
        isSale && <ProductPrice price={price} />
      }
    </div>
  )
}

function ProductPrice({ price, lineThrough = false }) {
  return (
    <div>
      <p className={`${(lineThrough) ? "line-through" : "text-orange-500 text-[30px]"}`}><span>₫</span>
        <span>{price}</span></p>
    </div>
  )
}

function InputQuantity({ quantity }) {
  return (
    <ProductAttribute title='So luong'>
      <div className='flex items-center gap-2 border justify-start'>
        <button className='px-3 border'>
          -
        </button>
        <input className='py-1 px-2 outline-none border-none' size={1} type='text' value={quantity} />
        <button className='px-3 border'>
          +
        </button>
      </div>
    </ProductAttribute>
  )
}

function ProductAttribute({ title, children,props }) {
  return (
    <div className={"flex mb-3"}>
      <span className='text-gray-400 text-[14px]'>{title}</span>
      <div className={'ms-[20px]'}>
        {children}
      </div>
    </div>
  )
}
