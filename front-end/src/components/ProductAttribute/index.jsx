import { useState } from "react";

export function ProductAttributeItem({ title, values }) {
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
  
 export function ProductAttributeItemValue({ value,disabled=false }) {
    const [selected, setSelected] = useState(false);
    return (
      <button disabled={disabled} onClick={()=>setSelected(!selected)} className={`text-[14px] text-center px-2 py-1 border  ${selected && "text-orange-500 border-orange-500"} ${disabled ? "bg-slate-200 text-white" : "hover:text-orange-500 hover:border-orange-500"}`}>{value}</button>
    )
  }
  
 export function ProductPriceDetail({ price, isSale = false }) {
    return (
      <div className='px-3 py-3 flex gap-2 bg-slate-100 rounded items-center'>
        <ProductPrice price={price} lineThrough={isSale} />
        {
          isSale && <ProductPrice price={price} />
        }
      </div>
    )
  }
  
 export function ProductPrice({ price, lineThrough = false }) {
    return (
      <div>
        <p className={`${(lineThrough) ? "line-through" : "text-orange-500 text-[30px]"}`}><span>₫</span>
          <span>{price}</span></p>
      </div>
    )
  }
  
 export function InputQuantity({ quantity }) {
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
  
export  function ProductAttribute({ title, children,props }) {
    return (
      <div className={"flex mb-4"}>
        <span className='text-gray-400 text-[14px]'>{title}</span>
        <div className={'ms-[20px]'}>
          {children}
        </div>
      </div>
    )
  }

