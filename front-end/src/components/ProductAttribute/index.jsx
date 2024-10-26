import { useEffect, useState } from "react";


const MAX_QUANTITY = 15;
const MIN_QUANTITY = 1;
export function ProductAttributeItem({ title, values, setAttributes, currentAttribute, setCurrentAttribute, hiddenAttributeValue }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    if (index === selected) {
      setCurrentAttribute(null);
      setSelected(null)
    } else {
      setSelected(index);
      setCurrentAttribute(title);
    }
  };

  return (
    <ProductAttribute title={title} >
      <div className='grid grid-cols-3 gap-2'>
        {
          values.map((item, index) => {
            return <ProductAttributeItemValue currentAttribute={currentAttribute} hiddenAttributeValue={hiddenAttributeValue} title={title} setAttributes={setAttributes} handleSelect={() => handleSelect(index)} selected={selected} index={index} key={index} value={item} />
          })
        }
      </div>
    </ProductAttribute>
  )
}

export function ProductAttributeItemValue({ value, handleSelect, index, selected, setAttributes, title, hiddenAttributeValue, currentAttribute }) {
  const [disabled, setDisabled] = useState(false);

  if (title !== currentAttribute && hiddenAttributeValue.includes(value)) {
    return <span className={"text-[14px] text-center px-2 py-1 border bg-slate-300"}>{value}</span>
  }

  return (
    <button disabled={disabled} onClick={() => {
      handleSelect(index);
      setAttributes((prev) => {
        return {
          ...prev,
          attributes: {
            ...prev.attributes,
            [title]: prev.attributes[title] === value ? null : value
          }
        }
      })
    }} className={`text-[14px] text-center px-2 py-1 border  ${index === selected && "text-orange-500 border-orange-500 shadow "}`}>{value}</button>
  )
}

export function ProductPriceDetail({ price, isSale = false, discount }) {

  const calculateDiscount = (price, discount) => {
    const priceArray = price.toString().split('-');
    if (priceArray.length >= 2) {
      const minPrice = Number(priceArray[0].trim());
      const maxPrice = Number(priceArray[1].trim());
      return `${minPrice - (minPrice * discount / 100)} - ${maxPrice - (maxPrice * discount / 100)}`
    }
    else {
      return price - (price * discount / 100);
    }
  }

  return (
    <div className='px-3 py-3 flex gap-2 bg-slate-100 rounded items-center'>
      <ProductPrice price={price} lineThrough={isSale} />
      {
        isSale && <ProductPrice price={isSale ? calculateDiscount(price, discount) : price} />
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

export function InputQuantity({ quantity, setQuantity, hidden }) {

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
      <div>
        <label for="Quantity" class="sr-only"> Quantity </label>
        <div class="flex items-center rounded border border-gray-200">
          <button onClick={() => handleQuantity('minus')} type="button" class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
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

          <button onClick={() => handleQuantity('plus')} type="button" class="size-10 leading-10 text-gray-600 transition hover:opacity-75">
            &#43;
          </button>
        </div>
      </div>


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

