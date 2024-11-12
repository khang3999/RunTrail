"use client";
import DropDownSelect from '@/components/Order/DropDownSelect';
import Field from '@/components/Order/Field'
import PaymentOptions from '@/components/Order/PaymentOptions';
import { convertLocationData, formatCurrency } from '@/utils';
import React, { useEffect, useState } from 'react'
import paypal from '../../assets/images/payp.png';
import momo from '../../assets/images/momo.webp';
import visa from '../../assets/images/visa.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function OrderPage() {

   // Submit order
   const [canSubmit, setCanSubmit] = useState(false);

   // Locations
   const [provinces, setProvinces] = useState([]);
   const [districts, setDistricts] = useState([]);
   const [wards, setWards] = useState([]);


   const [province, setProvince] = useState('');
   const [provinceError, setProvinceError] = useState('');
   const [district, setDistrict] = useState('');
   const [districtError, setDistrictError] = useState('');
   const [ward, setWard] = useState('');
   const [wardError, setWardError] = useState('');

   // Get demo product in cookies
   const [cart, setCart] = useState([]);

   // Fields
   const [phone, setPhone] = useState('');
   const [phoneError, setPhoneError] = useState('');

   const [firstName, setFirstName] = useState('');
   const [firstNameError, setFirstNameError] = useState('');

   const [lastName, setLastName] = useState('');
   const [lastNameError, setLastNameError] = useState('');

   const [shippingAddress, setShippingAddress] = useState('');
   const [shippingAddressError, setShippingAddressError] = useState('');

   const [paymentError, setPaymentError] = useState('');

   const [discountPercent, setDiscountPercent] = useState(0);

   const [paymentMethod, setPaymentMethod] = useState('');

   // Discount
   const [discountCode, setDiscountCode] = useState('');
   const [discountError, setDiscountError] = useState('');

   // Total
   const [total, setTotal] = useState(0);
   const [shippingFee, setShippingFee] = useState(0);

   // Reset cart
   const reset = () => {
      Cookies.remove('cart');
      setFirstName('');
      setLastName('');
      setPhone('');
      setShippingAddress('');
      setProvince('');
      setDistrict('');
      setWard('');
      setPaymentMethod('');
      setDiscountCode('');
      setTotal(0);
      setShippingFee(0);
      setCart([]);
      setDiscountPercent(0);
   }

   // Check discount
   const checkDiscount = () => {
      if (discountCode === '') {
         setDiscountError('Vui lòng nhập mã giảm giá');
         setCanSubmit(false);
      } else {
         setDiscountError('');
      }

      if (discountCode === 'VIPPRO') {
         setDiscountPercent(10);
      }
   }

   // Handle Order with payment method = 'pay-after-delivery'
   const handleOrder = async () => {
      setCanSubmit(true);

      // Check empty fields
      if (phone === '') {
         setPhoneError('Vui lòng nhập số điện thoại');
         setCanSubmit(false);
      } else {
         setPhoneError('');
      }

      if (firstName === '') {
         setFirstNameError('Vui lòng nhập họ');
         setCanSubmit(false);
      } else {
         setFirstNameError('');
      }

      if (lastName === '') {
         setLastNameError('Vui lòng nhập tên');
         setCanSubmit(false);
      } else {
         setLastNameError('');
      }

      if (shippingAddress === '') {
         setShippingAddressError('Vui lòng nhập địa chỉ');
         setCanSubmit(false);
      } else {
         setShippingAddressError('');
      }

      if (paymentMethod === '') {
         setPaymentError('Vui lòng chọn phương thức thanh toán');
         setCanSubmit(false);
      } else {
         setPaymentError('');
      }

      if (province === '') {
         setProvinceError('Vui lòng chọn tỉnh/thành phố');
         setCanSubmit(false);
      } else {
         setProvinceError('');
      }

      if (district === '') {
         setDistrictError('Vui lòng chọn quận/huyện');
         setCanSubmit(false);
      }
      else {
         setDistrictError('');
      }

      if (ward === '') {
         setWardError('Vui lòng chọn phường/xã');
         setCanSubmit(false);
      } else {
         setWardError('');
      }

      if (!canSubmit) {
         return;
      }

      const orderData = {
         totalPrice: total,
         paymentId: paymentMethod === 'pay-after-delivery' ? 1 : 2,  // ID của phương thức thanh toán
         shippingFee: shippingFee, // Phí vận chuyển
         shippingAddress: province + ', ' + district + ', ' + ward + ', ' + shippingAddress, // Địa chỉ giao hàng
         discount: discountPercent,    // Giảm giá
         phone: phone,
         customerName: firstName + ' ' + lastName,
         products: cart.map(item => {
            console.log("Sending Product Data:", item.id, item.skuPrice, item.quantity); // Kiểm tra sản phẩm
            return {
               productId: item.id, // Kiểm tra skuId ở đây
               price: item.skuPrice,
               quantity: item.quantity,
            }
         }), // Danh sách sản phẩm
      };

      // Kiểm tra orderData trước khi gửi
      console.log("Order Data:", orderData);


      const response = await fetch('http://localhost:8008/api/v1/order/new', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(orderData)
      })

      const data = await response.json();
      console.log(data)
      if (data.statusCode === 200) {
         // Clear cart
         reset();

         // Back to cart page
         toast.success('Đơn hàng đã được ghi nhận, nhân viên chúng tôi sẽ liên hệ quý khách sớm nhất có thể để xác nhận đơn');
      } else {
         toast.error('Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ');
      }
   }

   const payments = [
      {
         key: 'credit-card',
         value: 'Credit Card',
         name: 'Thẻ tín dụng',
         description: 'Pay with Visa, Mastercard, American Express, or Discover',
         icon: visa

      },
      {
         key: 'momo',
         value: 'Momo Wallet',
         name: 'Ví Momo',
         description: 'Pay with Momo Wallet',
         icon: momo
      },
      {
         key: 'pay-after-delivery',
         value: 'Pay After Delivery',
         name: 'Thanh toán sau khi nhận hàng',
         description: 'Pay with Momo Wallet',
      },
   ]

   useEffect(() => {
      const fetchProvinces = async () => {
         const response = await fetch('http://localhost:8008/api/v1/location/provinces', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
         });

         const data = await response.json();

         if (data.statusCode === 200) {
            setProvinces(convertLocationData(data.metadata));
         }
      }

      fetchProvinces();
   }, []);

   useEffect(() => {
      setDistricts([]);
      setWards([]);
      const fetchDistricts = async () => {
         const response = await fetch(`http://localhost:8008/api/v1/location/provinces/district/${province}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
         });

         const data = await response.json();
         if (data.statusCode === 200) {

            setDistricts(convertLocationData(data.metadata));
         }
      };
      fetchDistricts();
   }, [province]);

   useEffect(() => {
      const fetchDistricts = async () => {
         const response = await fetch(`http://localhost:8008/api/v1/location/provinces/district/ward/${district}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
         });

         const data = await response.json();
         if (data.statusCode === 200) {

            setWards(convertLocationData(data.metadata));
         }
      };
      fetchDistricts();
   }, [district]);

   useEffect(() => {
      const getCartProduct = async () => {
         setCart([]);
         let totalAmount = 0;
         const data = Cookies.get('cart');

         if (data) {
            const cartData = JSON.parse(data);
            console.log(cartData);

            if (cartData.length > 0) {
               const updatedCart = [];

               for (const item of cartData) {
                  if (item.skuId) {
                     const response = await fetch(`http://localhost:8008/api/v1/sku/${item.skuId}`, {
                        method: 'GET',
                        headers: {
                           'Content-Type': 'application/json'
                        },
                     });

                     const productData = await response.json();
                     console.log(productData);

                     updatedCart.push({ ...productData, quantity: item.quantity });
                     totalAmount += productData.skuPrice * item.quantity;
                  }
               }

               setCart(updatedCart);
               setTotal(totalAmount);
            }
         }
      };

      getCartProduct();
   }, []); // Add `total` if you need to use it from state directly.



   return (
      <div className="flex flex-col-reverse lg:flex-row">
         {/* Info */}
         <div className="lg:w-1/2 w-full pt-[40px] px-[80px] lg:pl-[200px] lg:pr-[40px] mb-[60px]">
            <div>
               <h3 className="text-xl font-bold mb-2">Thông tin liên lạc</h3>
               <p className='text-gray-500 text-sm mb-4'>Chúng tôi sẽ dùng thông tin liên lạc này để xác nhận, giao hàng</p>
               <Field name={"phone"} placeholder={"Số điện thoại liên hệ"} errorMessage={phoneError} value={phone} onChange={(text) => {
                  setPhone(text)
               }} />
            </div>

            <div className="mt-[60px] mb-4">
               <h3 className="text-xl font-bold mb-2">Giao hàng</h3>
               <p className='text-gray-500 text-sm mb-4'>Địa chỉ này cũng sẽ được dùng làm địa chỉ thanh toán cho đơn hàng này.</p>
            </div>

            <div>
               <DropDownSelect options={provinces} placeholder={"Chọn Tỉnh/Thành phố"} errorMessage={provinceError} onChange={(selected) => { setProvince(selected) }} />
            </div>

            <div className='flex items-center justify-between gap-4 mt-3'>
               <DropDownSelect options={districts} placeholder={"Chọn Quận/Huyện"} errorMessage={districtError} disabled={districts.length === 0} onChange={(selected) => { setDistrict(selected) }} />
               <DropDownSelect options={wards} disabled={wards.length === 0} errorMessage={wardError} placeholder={"Chọn Phường/Xã"} onChange={(selected) => { setWard(selected) }} />
            </div>

            <div className='mt-3 flex items-center justify-between gap-4'>
               <Field name={"firstname"} placeholder={"Họ"} errorMessage={firstNameError} value={firstName} onChange={(text) => {
                  setFirstName(text)
               }} />

               <Field name={"lastname"} placeholder={"Tên"} errorMessage={lastNameError} value={lastName} onChange={(text) => { setLastName(text) }} />
            </div>

            <div className='mt-3 flex items-center justify-between gap-4'>
               <Field name={"shippingAddress"} placeholder={"Địa chỉ nhận hàng (Số nhà, đường phố, hẻm, Căn hộ, ...)"} errorMessage={shippingAddressError} value={shippingAddress} onChange={(text) => {
                  setShippingAddress(text)
               }} />
            </div>

            <div className="mt-[60px] mb-4">
               <h3 className="text-xl font-bold mb-2">Thanh toán</h3>
               <p className='text-gray-500 text-sm mb-4'>Địa chỉ thanh toán của phương thức thanh toán phải khớp với địa chỉ giao hàng. Toàn bộ các giao dịch được bảo mật và mã hóa.</p>
               <PaymentOptions options={payments} onSelect={(option) => setPaymentMethod(option)} />
               {paymentError && <p className='text-red-500 text-sm mt-2'>{paymentError}</p>}
            </div>

            {paymentMethod === 'pay-after-delivery' && <div className='flex items-start justify-center p-4 rounded-2xl bg-yellow-100 border border-yellow-400'>
               <div className='mr-4'>
                  <FontAwesomeIcon icon={faTriangleExclamation} className=' text-yellow-500 text-[20px]' />
               </div>
               <div>
                  <h3 className='font-semibold'>Lưu ý quan trọng</h3>
                  <p>Để đảm bảo quyền lợi khách hàng, Quý khách vui lòng KHÔNG CHUYỂN TIỀN TRƯỚC cho shipper khi chưa nhận được kiện hàng với bất kì lí do nào.</p>
               </div>
            </div>}

            <div>
               <button className='w-full bg-[#12283e] text-white rounded-lg py-4 mt-4'
                  onClick={() => {
                     handleOrder()
                  }}
               >{
                     paymentMethod === 'momo' || paymentMethod === 'credit-card' ? 'Chuyển tới trang thanh toán' : 'Đặt hàng'
                  }</button>
            </div>
         </div >
         {/* Product */}
         <div div className="flex-1 lg:min-h-[100vh] border-l border-gray lg:w-1/2 w-full px-[80px] lg:pr-[200px] lg:pl-[40px]" >
            <div className="lg:mt-[40px] mt-[60px] mb-4">
               <h3 className="text-xl font-bold mb-2">Tóm tắt đơn hàng</h3>
               {cart.length > 0 && cart.map((item, index) => (
                  <div key={item.skuId} className='flex items-center justify-between gap-4 mt-4'>
                     <div className='flex items-center gap-4'>
                        <Image alt='product' src={item.images && item.images.length > 0 ? item.images[0].imageUrl : "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"} width={500} height={500} className='w-[100px] rounded-lg h-[100px] border' />
                        <div className=''>
                           <h4 className=''>{item.skuName}</h4>
                           <div className='text-gray-400 text-sm flex items-center justify-start gap-1'>
                              <FontAwesomeIcon icon={faX} className='w-[8px] h-[8px]' />
                              <p className='mb-0 pb-0 text-[16px]'>
                                 {item.quantity}
                              </p>
                           </div>
                        </div>
                     </div>
                     <div>
                        <p>{formatCurrency(item.quantity * item.skuPrice)}</p>
                     </div>
                  </div>
               ))}
               <div className="mt-4 py-4 border-t flex items-center justify-center w-full">
                  <div className="flex items-center justify-center gap-4 flex-col w-full">
                     <Field name={"discount"} placeholder={"Mã giảm giá"} errorMessage={discountError} value={discountCode} onChange={(text) => { setDiscountCode(text) }} />

                     <button className="bg-orange-400 rounded-lg text-white w-full min-w-[140px] p-4 text-sm"
                        onClick={checkDiscount}
                     >Áp dụng</button>
                  </div>
               </div>
               <div className='border-t mt-2'>
                  <div>
                     <div className='flex items-center justify-between gap-4 mt-4'>
                        <div>
                           <h4 className='font-semibold'>Tạm tính</h4>
                        </div>
                        <div>
                           <p>{formatCurrency(total)}</p>
                        </div>
                     </div>
                     <div className='flex items-center justify-between gap-4 mt-4'>
                        <div>
                           <h4 className='font-semibold'>Phí vận chuyển</h4>
                        </div>
                        <div>
                           <p>{formatCurrency(shippingFee)}</p>
                        </div>
                     </div>
                     <div className='flex items-center justify-between gap-4 mt-4'>
                        <div>
                           <h4 className='font-semibold'>Giảm giá</h4>
                        </div>
                        <div>
                           {/* <p>{formatCurrency(discountCode)}</p> */}
                           <p>
                              {formatCurrency(total * ((discountPercent / 100)))}
                           </p>
                        </div>
                     </div>
                     <div className='flex items-center justify-between gap-4 mt-4 border-t pt-4'>
                        <div>
                           <h4 className='font-semibold'>Tổng</h4>
                        </div>
                        <div>
                           <p>{formatCurrency(total * (1 - discountPercent / 100))}</p>
                        </div>
                     </div>
                  </div>
               </div >
            </div >
         </div >
      </div >
   )
}

export default OrderPage
