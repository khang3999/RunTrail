'use client';
import { useEffect, useState } from "react";
import {useProductAttributesProvider } from "@/contexts/ProductAttributesProvider";

const MAX_QUANTITY = 15;
const MIN_QUANTITY = 1;

export function ProductAttributeList() {
  const {spuAttributes} = useProductAttributesProvider();
  return (
      <div>
          {
              Object.keys(spuAttributes).map((key, index) => {
                  return <ProductAttributeItem key={index} attribute={{ name: key, values: spuAttributes[key] }} />
              })
          }
      </div>

     
  )
}

export function ProductAttributeItem({ attribute }) {

  const {setData,data,listAttrOutOfStock,setListAttrOutOfStock} = useProductAttributesProvider();
  const [currentSelect, setCurrentSelect] = useState(null);

  useEffect(() => {
      if (currentSelect !== null) {
          setData({
              ...data,
              attributes: {
                  ...data.attributes,
                  [attribute.name]: attribute.values[currentSelect]
              }
          });
      }
      else {
          const newAttributes = { ...data.attributes };
          delete newAttributes[attribute.name];
          setData({
              ...data,
              attributes: newAttributes
          });
      }

  },[currentSelect]);

  const handleClick = ({index}) => {
      if ((currentSelect === null) || currentSelect !== index) {
          setCurrentSelect(index);
      }
      else {
          setCurrentSelect(null);
          setListAttrOutOfStock([]);
          console.log("null", index)
      }
  };

  return (

      <ProductAttribute title={attribute.name}>
            <div>
              {
                  attribute.values.map((value, index) => {
                      const isDisabled = listAttrOutOfStock.some(attr => attr.attribute === attribute.name && attr.values.includes(value));
                      const isSelected = currentSelect === index;
                      return <ProductAttributeItemValue disabled={isDisabled} selected={isSelected} onClick={()=>handleClick({index})} key={index} value={value} />
                  })
              }
          </div>
      </ProductAttribute>
  )
}

export function ProductAttributeItemValue({ value,disabled=false,selected,onClick }) {
  if (disabled) {
      return <span className={"inline-block h-[30px] px-3  border mx-2 bg-[#eee] text-gray-300"}>{value}</span>
  }
  return (
      <button onClick={onClick} className={`h-[30px] px-3 bg-slate-50 border mx-2 ${selected && "border-orange-500 text-orange-500"}`} >{value}</button>
  )
}

export function ProductPriceDetail({ price, isSale = false, discount }) {

  const calculateDiscount = (price, discount) => {
    const priceArray = price.toString().split('-');
    if (priceArray.length > 2) {
      const minPrice = Number(priceArray[0].trim());
      const maxPrice = Number(priceArray[1].trim());
      return `${minPrice-(minPrice * discount / 100)} - ${maxPrice-(maxPrice * discount / 100)}`
    }
    else{
      return price - (price * discount / 100);
    }
  }

  return (
    <div className='px-3 py-3 flex gap-2 bg-slate-100 rounded items-center'>
      <ProductPrice price={price} lineThrough={isSale} />
      {
        isSale && <ProductPrice price={isSale ? calculateDiscount(price,discount) : price } />
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

export function InputQuantity({ quantity,setQuantity,hidden }) {

  const handleQuantity = (type) => {
    if (type === 'plus' && quantity < MAX_QUANTITY) {
      setQuantity(quantity + 1)
    } else {
      if (quantity > MIN_QUANTITY && type === 'minus') {
        setQuantity(quantity - 1)
      }
    }

  }
  return (
    <ProductAttribute title='Số lượng'>
      {
          hidden ? <span className='text-red-500'>Sản phẩm đã hết hàng</span> :(
            <div>
        
        <label for="Quantity" class="sr-only"> Quantity </label>
        <div class="flex items-center rounded border border-gray-200">
          <button onClick={()=> handleQuantity('minus')} type="button" class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
            &minus;
          </button>
          <input
            onBlur={(e) => (e.target.value > MAX_QUANTITY) ? setQuantity(MAX_QUANTITY) : (e.target.value < 1) ? setQuantity(MIN_QUANTITY) : setQuantity(e.target.value)}
            type="number"
            id="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button onClick={()=> handleQuantity('plus')} type="button" class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
            &#43;	
          </button>
        </div>
      </div>
          )
        }
      
    </ProductAttribute>
  )
}

export function ProductAttribute({ title, children, props }) {
  return (
    <div className={"flex mb-4"}>
      <span className='text-gray-400 text-[14px]'>{title}</span>
      <div className={'ms-[20px]'}>
        {children}
      </div>
    </div>
  )
}

