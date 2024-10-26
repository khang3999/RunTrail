import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '@/components/CustomButton';
import { ProductPriceDetail, InputQuantity, ProductAttributeList } from '@/components/ProductAttribute';
import { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ProductAttributesProvider } from '@/contexts/ProductAttributesProvider';
export default function ProductDetailItem({ product, setProduct, isLoading }) {
  const [price, setPrice] = useState(100000);
  const [quantity, setQuantity] = useState(1);
  const [hidden, setHidden] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div>
      <div className='flex items-center gap-2 mb-4'>
        <h4 className='text-[20px]'>{product.spuName || <Skeleton height={30} />}</h4>
        <FontAwesomeIcon onClick={() => setIsLiked(!isLiked)} className={`cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`} icon={faHeart} />
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
          isLoading ? <Skeleton count={2} className='mb-3' width={300} height={50} /> : (
              <ProductAttributesProvider>
                <ProductAttributeList />
              </ProductAttributesProvider>
            )
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

