import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '@/components/CustomButton';
import { ProductPriceDetail, InputQuantity, ProductAttributeList, ProductAttribute } from '@/components/ProductAttribute';
import { useState } from 'react';
import { useProductDetailProvider } from '@/contexts/ProductDetailProdvider';
import { toast } from 'react-toastify';
export default function ProductDetailItem({ product, isLoading }) {
  const { totalStock, skuPrice, hiddenQuantity } = useProductDetailProvider();
  const [hidden, setHidden] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      toast("Đã bỏ thích", { autoClose: 1000, type: "success" });
    }else{
      setIsLiked(true);
      toast("Đã thích", { autoClose: 1000, type: "success" });
    }
  };

  return (
    <div>
      <div className='flex items-center gap-2 mb-4'>
        {
          isLoading ? <Skeleton width={200} height={20} /> : (
            <>
              <h4 className='text-[24px]'>{product.spuName}</h4>
              <span>{`(${(totalStock == 0 ? "Hết hàng" : totalStock + " sản phẩm")})`}</span>
              <FontAwesomeIcon onClick={() => handleLike()} className={`cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`} icon={faHeart} />
            </>
          )
        }

      </div>
      <div className='flex items-center mb-4'>
        {
          isLoading ? <Skeleton width={200} height={20} /> : <ProductAttribute title={"Thương hiệu"}>
            <span>{product.brand.brandName}</span>
          </ProductAttribute>
        }
      </div>
      <div className='flex items-center mb-3'>
        {
          isLoading ? <Skeleton width={200} height={20} /> : <ProductAttribute title={"Mã sản phẩm"}>
            <span>{product.spuNo}</span>
          </ProductAttribute>
        }
      </div>
      <div className='mb-4'>
        {
          isLoading ? <Skeleton height={60} /> : <ProductPriceDetail discount={product.discount} price={skuPrice} isSale={true} />
        }
      </div>
      <div>
        {
          isLoading ? <Skeleton count={2} className='mb-3' width={300} height={50} /> : (
            <ProductAttributeList productId={product.id} spuAttributes={product.spuAttributes} />
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
            <CustomButton onClick={() => { !hiddenQuantity && (new toast("Vui lòng chọn loại", { autoClose: 2000, type: "error" })) }} title='Thêm vào giỏ hàng' background='bg-orange-100' color='text-orange-500' border={'border-orange-600'} >
              <FontAwesomeIcon icon={faCartShopping} />
            </CustomButton>
            <CustomButton onClick={() => { !hiddenQuantity && (new toast("Vui lòng chọn loại", { autoClose: 2000, type: "error" })) }} title='Mua ngay' background='bg-orange-500' color='text-white' />
          </>
        }
      </div>
    </div>
  )
}

