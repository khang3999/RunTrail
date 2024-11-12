import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/assets/css/imageDesktop.css";
import ReactImageMagnify from "react-image-magnify";
import Skeleton from "react-loading-skeleton";
import ProductImageModal from "../ProductImageModal";
import Overplay from "../Overlay";
export default function ImageDesktop({ product, isLoading }) {
  const perPage = 5;
  const [selectedImage, setSelectedImage] = useState(0);
  const [dataImages, setDataImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (product && product.images) {
      setSelectedImage(0);
      setDataImages(product.images);
    }
  }, [product]);

  const handleThumnailClick = (image) => {
    setSelectedImage(image);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      {/* Model  */}
      {/* Product Image Model */}
      {product.images && product.images.length > 0 && (
        <>
          {/* Overlay */}
          <Overplay
            onClose={() => {
              setShowModal(false);
            }}
            visible={showModal}
          />
          {/* Modal */}
          <ProductImageModal
            init={selectedImage}
            data={product.images}
            visible={showModal}
            onClose={() => {
              setShowModal(!showModal);
            }}
          />
        </>
      )}
      {/* Image section */}
      <div className="w-full h-full flex flex-col  border-1 justify-center items-center">
        {/* Hover image */}
        <div className="w-full flex flex-1 justify-center items-center z-[3] mb-2">
          <>
            <button
              className="btn-image-desktop w-full h-full"
              onClick={() => {
                if (product.images && product.images.length > 0) {
                  setShowModal(!showModal);
                } else {
                  alert("No image available");
                }
              }}
            >
              {isLoading ? (
                <Skeleton className="w-full md:h-full h-[300px]"></Skeleton>
              ) : (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src:
                        product.images.length > 0
                          ? product.images[selectedImage].imgUrl
                          : "",
                    },
                    largeImage: {
                      src:
                        product.images.length > 0
                          ? product.images[selectedImage].imgUrl
                          : "",
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerDimensions: {
                      width: "120%",
                      height: "120%",
                    },
                    enlargedImageContainerStyle: {
                      objectFit: "cover",
                      marginLeft: 25,
                    },
                  }}
                />
              )}
            </button>
          </>
        </div>

        {/* List images slide*/}
        <div className="w-full stroke-slate-400 border-2 p-4">
          {isLoading ? (
            <div className="flex flex-row justify-between items-center">
              <Skeleton width={65} height={65} />
              <Skeleton width={65} height={65} />
              <Skeleton width={65} height={65} />
              <Skeleton width={65} height={65} />
              <Skeleton width={65} height={65} />
            </div>
          ) : (
            <>
              <Swiper
                slidesPerView={perPage}
                spaceBetween={15}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="h-[80px] w-[100%]"
              >
                {dataImages &&
                  dataImages.map((image, index) => {
                    console.log(1);
                    console.log(image.imgUrl);
                    return (
                      <SwiperSlide
                        key={index}
                        className="border-1 flex justify-center"
                      >
                        <button onClick={() => handleThumnailClick(index)}>
                          <img className="w-full" src={image.imgUrl}></img>
                        </button>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </>
          )}
        </div>
      </div>
      {/* <ImageDesktopSkeleton></ImageDesktopSkeleton> */}
      {/* Infor section */}
    </>
  );
}
