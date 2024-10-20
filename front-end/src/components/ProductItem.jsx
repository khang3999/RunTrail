"use client"
import Link from 'next/link'
import React from 'react'
import { FaStarHalfStroke, FaStar } from "react-icons/fa6";
import '@/assets/css/addToCartBtn.css'

function ProductItem(props) {
    const product = props.product
    const price = props.price
    const brand = props.brand
    // console.log(product);


    // Xử lí tiền theo định dạng
    const numeral = require('numeral')
    //Làm tròn lên
    function roundToNearest500(amount) {
        // Chia cho 500, làm tròn lên, rồi nhân lại với 500
        return Math.ceil(amount / 500) * 500;
    }
    // Định dạng
    function formatPrice(number) {
        if (number <= 1000) {
            return '1.000'  
        }
        return numeral(number).format('0,0').replace(/,/g, '.')
    }
    // console.log(product[0]);
    
    // console.log(formatPrice(product.spuPrice * (100-25)/100));
    
    return (
        <>
            <div className="group product-item rounded border-2">
                {/* Image */}
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
                    <Link href="/detail" className="title">
                        <div className="image-wrap relative w-full h-[220px] bg-white">
                            <img src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." className="absolute thumnail-1 object-cover object-center w-full h-[250px]" ></img>
                            <img src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg" alt="Front of men&#039;s Basic Tee in black." className="absolute thumnail-2 object-cover object-center w-full h-[250px]"></img>

                            {product.discount
                                ? (<span className="text-center items-center rounded-md bg-red-700 px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-red-600/10 z-1 absolute top-2 left-2">-{product.discount}%</span>)
                                : ''}
                        </div>
                    </Link>
                </div>
                {/* Information */}
                <div className="group px-[15px] my-4">
                    {/* Body */}
                    <div className="item-body">
                        <p className='brand font-extralight italic text-gray-400 mb-1'>{product.brandName}</p>
                        <Link href="/detail" className="title font-semibold line-clamp-2 text-ellipsis">{product.spuName}</Link>

                        {/*Rating*/}
                        <div className='rating flex flex-row mt-2'>
                            <FaStar className='text-yellow-300' />
                            <FaStar className='text-yellow-300' />
                            <FaStar className='text-yellow-300' />
                            <FaStar className='text-yellow-300' />
                            <FaStarHalfStroke className='text-yellow-300' />
                        </div>
                        {/* Price */}
                        <div className="price flex flex-col items-start pt-3">
                            <p className='flex-1 text-gray-400 line-clamp-1'>
                                {product.discount
                                    ? (<s>{formatPrice(product.spuPrice)} VNĐ</s>)
                                    : <br></br>}
                            </p>
                            <p className='flex-1 text-[20px] font-semibold text-red-600 line-clamp-1'>
                                {product.discount
                                    ? (formatPrice(
                                        (product.spuPrice) *
                                        (100 - product.discount)/100))
                                    : formatPrice(product.spuPrice)} VNĐ</p>
                        </div>
                    </div>
                    {/* Footer */}
                    {/*<div className="item-footer flex justify-end">*/}
                    {/*    <button className="cartBtn">*/}
                    {/*        <svg className="cart" fill="white" viewBox="0 0 576 512" height="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>*/}
                    {/*        <p className='text-[14px]'>ADD TO CART</p>*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 640 512" className="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div >
        </>
    )
}

export default ProductItem