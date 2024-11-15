import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "@/assets/css/markdownImage.css";
import MarkdownPreview from "@uiw/react-markdown-preview";

const TabInformation = ({ product, isLoading }) => {
  const [tab, setTab] = useState(1);
  useEffect(() => {
    console.log("tab", product.spuDescription);
  }, [tab]);
  return (
    <div className=" lg:mx-[135px] mx-[10px]">
      <div className="grid lg:grid-cols-2">
        <div className="grid grid-cols-3">
          <div
            className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] flex justify-center items-center font-semibold  cursor-pointer ${tab === 1 && !isLoading ? "bg-violet-500 text-white" : ""}`}
            onClick={() => setTab(1)}
          >
            {isLoading ? <Skeleton className="h-5" /> : <p>Mô tả chi tiết</p>}
          </div>

          <div
            className={`p-3 text-center border border-slate-300 border-r-transparent border-b-transparent text-[18.3px] flex justify-center items-center cursor-pointer font-semibold ${tab === 2 ? "bg-violet-500 text-white" : ""}`}
            onClick={() => setTab(2)}
          >
            {isLoading ? <Skeleton className="h-5" /> : <p>Bình luận</p>}
          </div>

          <div
            className={`p-3 text-center border border-slate-300 border-b-transparent text-[18.3px] flex justify-center items-center cursor-pointer font-semibold ${tab === 3 ? "bg-violet-500 text-white" : ""}`}
            onClick={() => setTab(3)}
          >
            {isLoading ? <Skeleton className="h-5" /> : <p>Đánh giá</p>}
          </div>
        </div>
      </div>
      <div className="md:px-[130px] px-[10px] md:py-[24px] py-[10px] border border-slate-300">
        {isLoading ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <div className={`${tab === 1 ? "block" : "hidden"} mark-down-wrap`}>
            <MarkdownPreview
              source={product.spuDescription}
              style={{ background: "white", color: "black" }}
            />
          </div>
        )}
        <div className={`${tab === 2 ? "block" : "hidden"} text-stone-400`}>
          Tính năng đang phát triển
        </div>
        <div className={`${tab === 3 ? "block" : "hidden"} text-stone-400`}>
          Tính năng đang phát triển
        </div>
      </div>
    </div>
  );
};

export default TabInformation;
