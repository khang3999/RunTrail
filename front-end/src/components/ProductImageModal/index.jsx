import {
  faAngleLeft,
  faAngleRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faClose,
  faCompress,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "../Loadings/Skeleton";
import { useAppProvider } from "@/contexts/AppProvider";

function ProductImageModal({
  visible = false,
  onClose = () => {},
  data = [],
  init = 0,
}) {
  const [currentIndex, setCurrentIndex] = useState(init ? init : 0);
  const [show, setShow] = useState(visible);
  const slideContainerRef = useRef(null);
  const [width, setWidth] = useState("467px");
  const [height, setHeight] = useState("467px");
  const [isZoom, setIsZoom] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useAppProvider();

  useEffect(() => {
    setCurrentIndex(init);
  }, [init]);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (visible) {
      if (!isMobile) {
        setWidth("667px");
        setHeight("667px");
      } else {
        setWidth("90%");
        setHeight("90%");
      }
      setShow(true);
    } else {
      setWidth("467px");
      setHeight("467px");
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible, isMobile]);

  const handleShowNextSlide = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleShowPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(data.length - 1);
    }
  };

  const scrollLeft = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollLeft -= 200; // Cuộn sang trái 100px
    }
  };

  const scrollRight = () => {
    if (slideContainerRef.current) {
      slideContainerRef.current.scrollLeft += 200; // Cuộn sang phải 100px
    }
  };

  const handleZoom = () => {
    if (isZoom) {
      if (!isMobile) {
        setWidth("667px");
        setHeight("667px");
      } else {
        setWidth("90%");
        setHeight("90%");
      }
    } else {
      setWidth("100%");
      setHeight("100%");
    }
    setIsZoom(!isZoom);
  };

  // Skeleton
  if (loading) {
    return (
      <div
        className={`rounded-sm p-3 select-none transition-all duration-300 overflow-hidden flex items-center justify-center ease-in-out fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white z-[10000] ${
          visible ? " opacity-100" : " opacity-0"
        } `}
        style={{
          width: width,
          height: height,
          visibility: show ? "visible" : "hidden",
        }}
      >
        {/* Actions  */}
        <div className="flex items-center justify-end gap-2 z-10 absolute top-3 right-3">
          <Skeleton className="w-6 h-8 p-4"></Skeleton>
          <Skeleton className="w-6 h-8 p-4"></Skeleton>
          <Skeleton className="w-6 h-8 p-4"></Skeleton>
          <Skeleton className="w-6 h-8 p-4"></Skeleton>
        </div>
        <div className="flex justify-center w-full h-full overflow-hidden items-center relative">
          {/* Images */}
          <Skeleton className="w-full h-full"></Skeleton>
        </div>
        {/* Slide Images */}
        <div className="absolute h-[67px] flex items-center px-8 justify-start overflow-hidden bottom-3 left-3 right-3">
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            ref={slideContainerRef}
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex w-fit gap-2 justify-center items-center">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    className={`w-[67px] h-[67px]`}
                  ></Skeleton>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={` rounded-sm p-3 select-none transition-all duration-300 overflow-hidden flex items-center justify-center ease-in-out fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white z-[10000] ${
        visible ? " opacity-100" : " opacity-0"
      } `}
      style={{
        width: width,
        height: height,
        visibility: show ? "visible" : "hidden",
      }}
    >
      {/* Actions  */}
      <div className="flex items-center justify-end gap-2 z-10 absolute top-3 right-3">
        <button
          onClick={handleZoom}
          className="bg-white text-gray-400 transition-colors duration-300 ease-linear hover:text-black w-8 h-8 p-2 border border-gray-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={isZoom ? faCompress : faExpand} />
        </button>
        <button
          onClick={handleShowPrevSlide}
          className="bg-white text-gray-400 transition-colors duration-300 ease-linear hover:text-black w-8 h-8 p-2 border border-gray-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          onClick={handleShowNextSlide}
          className="bg-white text-gray-400 transition-colors duration-300 ease-linear hover:text-black w-8 h-8 p-2 border border-gray-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          onClick={() => {
            onClose();
            setIsZoom(false);
          }}
          className="bg-white text-gray-400 transition-colors duration-300 ease-linear hover:text-black w-8 h-8 p-2 border border-gray-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="flex justify-center overflow-hidden items-center relative">
        {/* Images */}
        <img
          src={data[currentIndex].imgUrl}
          alt="product"
          className="w-[100%] select-none"
        />
      </div>
      {/* Slide Images */}
      <div className="absolute flex items-center px-8 justify-start overflow-hidden bottom-3 left-3 right-3">
        <button className="absolute left-2" onClick={scrollLeft}>
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          ref={slideContainerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex border border-gray-400 w-fit justify-center items-center">
            {data.map((item, index) => (
              <button
                className={`w-[67px] ${index !== data.length - 1 && "border-r border-gray-400"} h-[67px] flex items-center justify-center`}
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                }}
              >
                <img src={item.imgUrl} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <button className="absolute right-2" onClick={scrollRight}>
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default ProductImageModal;
