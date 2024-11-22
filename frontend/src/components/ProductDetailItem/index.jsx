"use client";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "@/components/CustomButton";
import {
  ProductPriceDetail,
  InputQuantity,
  ProductAttributeList,
  ProductAttribute,
} from "@/components/ProductAttribute";
import { useState } from "react";
import { useProductDetailProvider } from "@/contexts/ProductDetailProdvider";
import { toast } from "react-toastify";
import { useAppProvider } from "@/contexts/AppProvider";
export default function ProductDetailItem({ product=null, isLoading=false }) {
  const {
    totalStock,
    skuPrice,
    hiddenQuantity,
    data,
    spuAttributes,
    setData,
    skuId,
  } = useProductDetailProvider();
  const { setTotalCart, totalCart } = useAppProvider();
  const [hidden, setHidden] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isErrorInput, setIsErrorInput] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      toast("Đã bỏ thích", { autoClose: 1000, type: "success" });
    } else {
      setIsLiked(true);
      toast("Đã thích", { autoClose: 1000, type: "success" });
    }
  };

  const handleAddToCart = async () => {
    // get key of data.attributes
    const keys = Object.keys(data.attributes);
    // get key of spuAttributes
    const keysSpu = Object.keys(spuAttributes);
    // check if key of data.attributes is not in spuAttributes
    const result = keysSpu.filter((item) => {
      return !keys.includes(item);
    });

    if (result.length > 0) {
      // toast error
      new toast(`Vui lòng chọn ${result.join(", ")}`, {
        autoClose: 2000,
        type: "error",
      });
      return;
    }

    if (quantity > totalStock) {
      new toast(`Số lượng sản phẩm không đủ`, {
        autoClose: 2000,
        type: "error",
      });
      setIsErrorInput(true);
      return;
    }

    setIsErrorInput(false);

    //save product to cookie
    if (!skuId || skuId.includes(",")) {
      console.log(skuId);
      new toast("Có lỗi xảy ra, vui lòng thử lại!!!", {
        autoClose: 2000,
        type: "error",
      });
    }
    saveProductToCookie({ skuId, quantity });
  };

  const saveProductToCookie = async ({ skuId, quantity }) => {
    const cart = Cookies.get("cart");
    let cartData = [];
    if (cart) {
      cartData = JSON.parse(cart);
    }
    const index = cartData.findIndex((item) => item.skuId === skuId);
    if (index === -1) {
      cartData.push({ skuId, quantity });
    } else {
      cartData[index].quantity += quantity;
    }
    console.log(cartData);
    
    Cookies.set("cart", JSON.stringify(cartData));
    new toast("Đã thêm vào giỏ hàng", { autoClose: 2000, type: "success" });

    // reset quantity and spuAttributes
    setQuantity(1);
    setTotalCart((prev) => prev + quantity);
    // setTotalCart to cookie
    Cookies.set("totalCart", totalCart);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {isLoading ? (
          <Skeleton width={200} height={20} />
        ) : (
          <>
            <h4 className="text-[24px]">{product.spuName}</h4>
            <span>{`(${totalStock == 0 ? "Hết hàng" : totalStock + " sản phẩm"})`}</span>
            <FontAwesomeIcon
              onClick={() => handleLike()}
              className={`cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`}
              icon={faHeart}
            />
          </>
        )}
      </div>
      <div className="flex items-center mb-4">
        {isLoading ? (
          <Skeleton width={200} height={20} />
        ) : (
          <ProductAttribute title={"Thương hiệu"}>
            <span>{product.brandName}</span>
          </ProductAttribute>
        )}
      </div>
      <div className="flex items-center mb-3">
        {isLoading ? (
          <Skeleton width={200} height={20} />
        ) : (
          <ProductAttribute title={"Mã sản phẩm"}>
            <span>{product.spuNo}</span>
          </ProductAttribute>
        )}
      </div>
      <div className="mb-4">
        {isLoading ? (
          <Skeleton height={60} />
        ) : (
          <ProductPriceDetail
            discount={product.discount}
            price={skuPrice}
            isSale={true}
          />
        )}
      </div>
      <div>
        {isLoading ? (
          <Skeleton count={2} className="mb-3" width={300} height={50} />
        ) : (
          <ProductAttributeList
            productId={product.id}
            spuAttributes={product.spuAttributes}
          />
        )}
      </div>
      <div className="mb-4">
        {isLoading ? (
          <Skeleton width={200} height={30} />
        ) : (
          <InputQuantity
            hidden={hidden}
            setQuantity={setQuantity}
            quantity={quantity}
            error={isErrorInput}
          />
        )}
      </div>
      <div className="flex gap-2">
        {isLoading ? (
          <Skeleton
            width={200}
            height={40}
            count={2}
            inline={true}
            className="mr-2"
          />
        ) : (
          <>
            <CustomButton
              onClick={handleAddToCart}
              title="Thêm vào giỏ hàng"
              background="bg-orange-100"
              color="text-orange-500"
              border={"border-orange-600"}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </CustomButton>
            <CustomButton
              onClick={() => {
                !hiddenQuantity &&
                  new toast("Vui lòng chọn loại", {
                    autoClose: 2000,
                    type: "error",
                  });
              }}
              title="Mua ngay"
              background="bg-orange-500"
              color="text-white"
            />
          </>
        )}
      </div>
    </div>
  );
}
