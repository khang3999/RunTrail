import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '@/components/CustomButton';
import {ProductPriceDetail,InputQuantity,ProductAttributeItem} from '@/components/ProductAttribute';
export default function ProductDetailItem({product, isLoading}) {
    return (
        <div>
        <h4 className='text-[20px] mb-4'>{product.spuName || <Skeleton height={30}/>}</h4>
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
            isLoading ? <Skeleton height={60} /> : <ProductPriceDetail price={100000} isSale={true} />
          }
        </div>
        <div>
          {
            isLoading ? <Skeleton count={2} className='mb-3' width={300} height={50} /> : Object.keys(product.spuAttributes).map((key, index) => {
              return <ProductAttributeItem key={index} title={key} values={product.spuAttributes[key]}/>
            })
          }
        </div>
        <div className='mb-4'>
          {
            isLoading ? <Skeleton width={200} height={30} /> : <InputQuantity quantity={1} />
          }
        </div>
        <div className='flex gap-2'>
          {
            isLoading ? <Skeleton width={200} height={40} count={2} inline={true} className='mr-2'/> : <>
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