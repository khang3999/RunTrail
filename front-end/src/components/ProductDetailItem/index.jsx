import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '@/components/CustomButton';
import { ProductPriceDetail, InputQuantity, ProductAttributeItem } from '@/components/ProductAttribute';
import { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
export default function ProductDetailItem({ product, setProduct, isLoading }) {
  const [price, setPrice] = useState(100000);
  const [quantity, setQuantity] = useState(1);
  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [spuAttributes, setSpuAttributes] = useState({
    'spuId': 42,
    'attributes': {},
  });

  const [hiddenAttributeValue, setHiddenAttributeValue] = useState([]);

  useEffect(() => {
    fetchStockAndPriceProduct();
  }, [spuAttributes]);

  const fetchStockAndPriceProduct = async () => {
    // remove params in attributes if value is null
    Object.keys(spuAttributes.attributes).forEach((key) => {
      if (spuAttributes.attributes[key] === null) {
        delete spuAttributes.attributes[key];
      }
    });

    const response = await fetch('http://localhost:8008/api/v1/spu/stock-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spuAttributes)
    })
    const data = await response.json()
    if (data.statusCode === 200) {
      const { totalStock, skuPrice, list } = data.metadata;
      setProduct((prev) => {
        return {
          ...prev,
          spuPrice: skuPrice,
        }
      });

      const listAttributes = JSON.parse(list);

      const hiddenAttributes = [];
      listAttributes.forEach((item) => {
        if (item.stock === 0) {
          Object.keys(item).forEach((key) => {
            if (currentAttribute && currentAttribute !== key && key !== 'stock') {
              hiddenAttributes.push(item[key]);
            }
          });
        }
      });

      setHiddenAttributeValue(hiddenAttributes);
    }
  }

  return (
    <div>
      <div className='flex items-center gap-2 mb-4'>
        <h4 className='text-[20px]'>{product.spuName || <Skeleton height={30} />}</h4>
        <FontAwesomeIcon onClick={()=>setIsLiked(!isLiked)} className={`cursor-pointer ${isLiked ? "text-red-500":"text-gray-500"}`} icon={faHeart} />
      </div>
      <div className='flex items-center mb-4'>
        {
          isLoading ? <Skeleton width={200} height={20} /> : <>
            <span className='text-gray-400 text-[14px]'>Thương hiệu:</span>
            <span className='ms-[20px]'>{product.brand.brandName}</span>
          </>
        }
      </div>
      <div className='mb-4'>
        {
          isLoading ? <Skeleton height={60} /> : <ProductPriceDetail discount={product.discount} price={product.spuPrice} isSale={true} />
        }
      </div>
      <div>
        {
          isLoading ? <Skeleton count={2} className='mb-3' width={300} height={50} /> : Object.keys(product.spuAttributes).map((key, index) => {
            return <ProductAttributeItem hiddenAttributeValue={hiddenAttributeValue} setCurrentAttribute={setCurrentAttribute} currentAttribute={currentAttribute} attributes={spuAttributes} setAttributes={setSpuAttributes} key={index} title={key} values={product.spuAttributes[key]} />
          })
        }
      </div>
      <div className='mb-4'>
        {
          isLoading ? <Skeleton width={200} height={30} /> : <InputQuantity hidden={hidden} setQuantity={setQuantity} quantity={quantity} />
        }
      </div>
      <div className='flex gap-2'>
        {
          isLoading ? <Skeleton width={200} height={40} count={2} inline={true} className='mr-2' /> : <>
            <CustomButton title='Thêm vào giỏ hàng' background='bg-orange-100' color='text-orange-500' border={'border-orange-600'} >
              <FontAwesomeIcon icon={faCartShopping} />
            </CustomButton>
            <CustomButton title='Mua ngay' background='bg-orange-500' color='text-white' />
          </>
        }
      </div>
    </div>
  )
}