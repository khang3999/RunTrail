"use client";
import DropDownSelect from "@/components/Order/DropDownSelect";
import Field from "@/components/Order/Field";
import PaymentOptions from "@/components/Order/PaymentOptions";
import { convertLocationData, formatCurrency } from "@/utils";
import React, { useEffect, useState } from "react";
import momo from "../../assets/images/momo.webp";
import visa from "../../assets/images/visa.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAppProvider } from "@/contexts/AppProvider";
import { useRouter } from "next/navigation";
import AxiosInstance from "@/utils/axiosInstance";
import { faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
function OrderPage() {
   const router = useRouter();
   // Submit order
   // const [canSubmit, setCanSubmit] = useState(true);

   // Locations
   const [provinces, setProvinces] = useState([]);
   const [districts, setDistricts] = useState([]);
   const [wards, setWards] = useState([]);

   const [province, setProvince] = useState("");
   const [provinceError, setProvinceError] = useState("");
   const [district, setDistrict] = useState("");
   const [districtError, setDistrictError] = useState("");
   const [ward, setWard] = useState("");
   const [wardError, setWardError] = useState("");

   // Get demo product in cookies
   const [cart, setCart] = useState([]);

   // Fields
   const [phone, setPhone] = useState("");
   const [phoneError, setPhoneError] = useState("");

   const [firstName, setFirstName] = useState("");
   const [firstNameError, setFirstNameError] = useState("");

   const [lastName, setLastName] = useState("");
   const [lastNameError, setLastNameError] = useState("");

   const [shippingAddress, setShippingAddress] = useState("");
   const [shippingAddressError, setShippingAddressError] = useState("");

   const [paymentError, setPaymentError] = useState("");

   const [discountPercent, setDiscountPercent] = useState(0);

   const [paymentMethod, setPaymentMethod] = useState("");

   // Discount
   const [discountCode, setDiscountCode] = useState("");
   const [discountError, setDiscountError] = useState("");

   // Total
   const [total, setTotal] = useState(0);
   const [shippingFee, setShippingFee] = useState(0);

   // Provider
   const { setAlertMessage, setAlertType, setTotalCart } = useAppProvider();

   // Lấy thông tin của người dùng từ localStorage nếu có
   useEffect(() => {
      const phone = localStorage.getItem("phone");
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
      const shippingAddress = localStorage.getItem("shippingAddress");
      const province = localStorage.getItem("province");
      const district = localStorage.getItem("district");
      const ward = localStorage.getItem("ward");
      const paymentMethod = localStorage.getItem("paymentMethod");

      // console.log("Phone", phone);
      // console.log("FirstName", firstName);
      // console.log("LastName", lastName);
      // console.log("ShippingAddress", shippingAddress);
      // console.log("Province", province);
      // console.log("District", district);
      // console.log("Ward", ward);
      // console.log("PaymentMethod", paymentMethod);

      if (phone) {
         setPhone(phone);
      }

      if (firstName) {
         setFirstName(firstName);
      }

      if (lastName) {
         setLastName(lastName);
      }

      if (shippingAddress) {
         setShippingAddress(shippingAddress);
      }

      if (province) {
         setProvince(province);
      }

      if (district) {
         setDistrict(district);
      }

      if (ward) {
         setWard(ward);
      }

      // if (paymentMethod) {
      //    setPaymentMethod(paymentMethod);
      // }
   }, []);

   // Reset cart
   const reset = () => {
      Cookies.remove("cart");
      setTotalCart(0);
      setFirstName("");
      setLastName("");
      setPhone("");
      setShippingAddress("");
      setProvince("");
      setDistrict("");
      setWard("");
      setPaymentMethod("");
      setDiscountCode("");
      setTotal(0);
      setShippingFee(0);
      setCart([]);
      setDiscountPercent(0);
   };

   // Check discount
   const checkDiscount = () => {
      if (discountCode === "") {
         setDiscountError("Vui lòng nhập mã giảm giá");
         // isSubmit = false;
      } else {
         setDiscountError("");
      }

      if (discountCode === "VIPCUSTOMER") {
         setDiscountPercent(100);
      }
   };

   // Handle Order with payment method = 'pay-after-delivery'
   const handleOrder = async () => {
      let isSubmit = true;
      console.log("Handle Order");
      // Check empty fields
      if (phone === "") {
         setPhoneError("Vui lòng nhập số điện thoại");
         isSubmit = false;
      } else {
         setPhoneError("");
      }

      if (firstName === "") {
         setFirstNameError("Vui lòng nhập họ");
         isSubmit = false;
      } else {
         setFirstNameError("");
      }

      if (lastName === "") {
         setLastNameError("Vui lòng nhập tên");
         isSubmit = false;
      } else {
         setLastNameError("");
      }

      if (shippingAddress === "") {
         setShippingAddressError("Vui lòng nhập địa chỉ");
         isSubmit = false;
      } else {
         setShippingAddressError("");
      }

      if (paymentMethod === "") {
         setPaymentError("Vui lòng chọn phương thức thanh toán");
         isSubmit = false;
      } else {
         setPaymentError("");
      }

      if (province === "") {
         setProvinceError("Vui lòng chọn tỉnh/thành phố");
         isSubmit = false;
      } else {
         setProvinceError("");
      }

      if (district === "") {
         setDistrictError("Vui lòng chọn quận/huyện");
         isSubmit = false;
      } else {
         setDistrictError("");
      }

      if (ward === "") {
         setWardError("Vui lòng chọn phường/xã");
         isSubmit = false;
      } else {
         setWardError("");
      }

      if (!isSubmit) {
         console.log("Can't submit");
         return;
      }

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("phone", phone);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("shippingAddress", shippingAddress);
      localStorage.setItem("province", province);
      localStorage.setItem("district", district);
      localStorage.setItem("ward", ward);
      localStorage.setItem("paymentMethod", paymentMethod);

      const orderData = {
         totalPrice: total,
         paymentId: paymentMethod === "pay-after-delivery" ? 1 : 2, // ID của phương thức thanh toán
         shippingFee: shippingFee, // Phí vận chuyển
         shippingAddress:
            province + ", " + district + ", " + ward + ", " + shippingAddress, // Địa chỉ giao hàng
         discount: discountPercent, // Giảm giá
         phone: phone,
         customerName: firstName + " " + lastName,
         products: cart.map((item) => {
            return {
               productId: item.id, // Kiểm tra skuId ở đây
               price: item.skuPrice,
               quantity: item.quantity,
            };
         }), // Danh sách sản phẩm
      };

      // Kiểm tra orderData trước khi gửi
      // console.log("Order Data:", orderData);

      try {
         const response = await fetch("http://localhost:8008/api/v1/order/new", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
         });

         const data = await response.json();
         // console.log(data);
         if (data.statusCode === 200) {
            // Clear cart
            reset();

            // Back to cart page
            setAlertType("success");
            setAlertMessage(
               "Đơn hàng đã được ghi nhận, nhân viên chúng tôi sẽ liên hệ quý khách sớm nhất có thể để xác nhận đơn",
            );

            // Chuyển trang sau khi đặt hàng thành công về cart không load lại trang
            router.push("/cart");
         } else {
            toast.error(
               "Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ",
            );
         }
      } catch (error) {
         toast.error(
            "Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ",
         );
      }
   };

   const payments = [
      {
         key: "credit-card",
         value: "Credit Card",
         name: "Thẻ tín dụng",
         description: "Pay with Visa, Mastercard, American Express, or Discover",
         icon: visa,
      },
      {
         key: "momo",
         value: "Momo Wallet",
         name: "Ví Momo",
         description: "Pay with Momo Wallet",
         icon: momo,
      },
      {
         key: "pay-after-delivery",
         value: "Pay After Delivery",
         name: "Thanh toán sau khi nhận hàng",
         description: "Pay with Momo Wallet",
      },
   ];

   useEffect(() => {
      // use AxiosInstance to fetch data
      const fetchProvinces = async () => {
         AxiosInstance.get("location/provinces").then((response) => {
            const data = response.data;
            if (data.statusCode === 200) {
               setProvinces(convertLocationData(data.metadata));
            }
         });
      };

      fetchProvinces();
   }, []);

   useEffect(() => {
      setDistricts([]);
      setWards([]);

      // use AxiosInstance to fetch data
      const fetchDistricts = async () => {
         AxiosInstance.get(`location/provinces/district/${province}`).then(
            (response) => {
               const data = response.data;
               if (data.statusCode === 200) {
                  setDistricts(convertLocationData(data.metadata));
               }
            },
         );
      };
      if (province) {
         fetchDistricts();
      }
   }, [province]);

   useEffect(() => {
      // use AxiosInstance to fetch data
      const fetchDistricts = async () => {
         AxiosInstance.get(`location/provinces/district/ward/${district}`).then(
            (response) => {
               const data = response.data;
               if (data.statusCode === 200) {
                  setWards(convertLocationData(data.metadata));
               }
            },
         );
      };

      if (district) {
         fetchDistricts();
      }
   }, [district]);

   useEffect(() => {
      const getCartProduct = async () => {
         setCart([]);
         const data = Cookies.get("cart");

         if (data) {
            let totalAmount = 0;
            const cartData = JSON.parse(data);
            if (cartData.length > 0) {
               const updatedCart = [];

               const promise = cartData.map(async (item) => {
                  if (item.skuId) {
                     // use AxiosInstance to fetch data
                     const response = await AxiosInstance.get(`sku/${item.skuId}`);
                     const productData = response.data;
                     updatedCart.push({ ...productData, quantity: item.quantity });
                     totalAmount +=
                        productData.skuPrice *
                        (1 - productData.spuDiscount / 100) *
                        item.quantity;
                  }
               });

               await Promise.all(promise);
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
         <div className="lg:w-1/2 w-full pt-[40px] px-[40px] lg:pl-[200px] lg:pr-[40px] mb-[60px]">
            <div>
               <h3 className="text-xl font-bold mb-2">Thông tin liên lạc</h3>
               <p className="text-gray-500 text-sm mb-4">
                  Chúng tôi sẽ dùng thông tin liên lạc này để xác nhận, giao hàng
               </p>
               <Field
                  name={"phone"}
                  placeholder={"Số điện thoại liên hệ"}
                  errorMessage={phoneError}
                  value={phone}
                  onChange={(text) => {
                     setPhone(text);
                  }}
               />
            </div>

            <div className="mt-[60px] mb-4">
               <h3 className="text-xl font-bold mb-2">Giao hàng</h3>
               <p className="text-gray-500 text-sm mb-4">
                  Địa chỉ này cũng sẽ được dùng làm địa chỉ thanh toán cho đơn hàng
                  này.
               </p>
            </div>

            <div>
               <DropDownSelect
                  options={provinces}
                  selected={province}
                  placeholder={"Chọn Tỉnh/Thành phố"}
                  errorMessage={provinceError}
                  onChange={(selected) => {
                     setProvince(selected);
                  }}
               />
            </div>

            <div className="flex items-center justify-between gap-4 mt-3">
               <DropDownSelect
                  selected={district}
                  options={districts}
                  placeholder={"Chọn Quận/Huyện"}
                  errorMessage={districtError}
                  disabled={districts.length === 0}
                  onChange={(selected) => {
                     setDistrict(selected);
                  }}
               />
               <DropDownSelect
                  selected={ward}
                  options={wards}
                  disabled={wards.length === 0}
                  errorMessage={wardError}
                  placeholder={"Chọn Phường/Xã"}
                  onChange={(selected) => {
                     setWard(selected);
                  }}
               />
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
               <Field
                  name={"firstname"}
                  placeholder={"Họ"}
                  errorMessage={firstNameError}
                  value={firstName}
                  onChange={(text) => {
                     setFirstName(text);
                  }}
               />

               <Field
                  name={"lastname"}
                  placeholder={"Tên"}
                  errorMessage={lastNameError}
                  value={lastName}
                  onChange={(text) => {
                     setLastName(text);
                  }}
               />
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
               <Field
                  name={"shippingAddress"}
                  placeholder={
                     "Địa chỉ nhận hàng (Số nhà, đường phố, hẻm, Căn hộ, ...)"
                  }
                  errorMessage={shippingAddressError}
                  value={shippingAddress}
                  onChange={(text) => {
                     setShippingAddress(text);
                  }}
               />
            </div>

            <div className="mt-[60px] mb-4">
               <h3 className="text-xl font-bold mb-2">Thanh toán</h3>
               <p className="text-gray-500 text-sm mb-4">
                  Địa chỉ thanh toán của phương thức thanh toán phải khớp với địa chỉ
                  giao hàng. Toàn bộ các giao dịch được bảo mật và mã hóa.
               </p>
               <PaymentOptions
                  options={payments}
                  onSelect={(option) => setPaymentMethod(option)}
               />
               {paymentError && (
                  <p className="text-red-500 text-sm mt-2">{paymentError}</p>
               )}
            </div>

            {paymentMethod === "pay-after-delivery" && (
               <div className="flex items-start justify-center p-4 rounded-2xl bg-yellow-100 border border-yellow-400">
                  <div className="mr-4">
                     <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className=" text-yellow-500 text-[20px]"
                     />
                  </div>
                  <div>
                     <h3 className="font-semibold">Lưu ý quan trọng</h3>
                     <p>
                        Để đảm bảo quyền lợi khách hàng, Quý khách vui lòng KHÔNG CHUYỂN
                        TIỀN TRƯỚC cho shipper khi chưa nhận được kiện hàng với bất kì
                        lí do nào.
                     </p>
                  </div>
               </div>
            )}

            <div>
               <button
                  className="w-full bg-[#12283e] text-white rounded-lg py-4 mt-4"
                  onClick={() => {
                     if (paymentMethod === "momo" || paymentMethod === "credit-card") {
                        router.push("/payment");
                     } else {
                        handleOrder();
                     }
                  }}
               >
                  {paymentMethod === "momo" || paymentMethod === "credit-card"
                     ? "Chuyển tới trang thanh toán"
                     : "Đặt hàng"}
               </button>
            </div>
         </div>
         {/* Product */}
         <div
            div
            className="flex-1 lg:min-h-[100vh] border-l border-gray lg:w-1/2 w-full px-[40px] lg:pr-[200px] lg:pl-[40px]"
         >
            <div className="lg:mt-[40px] mt-[60px] mb-4">
               <h3 className="text-xl font-bold mb-2">Tóm tắt đơn hàng</h3>
               {cart.length > 0 &&
                  cart.map((item, index) => (
                     <div
                        key={item.skuId}
                        className="flex items-center justify-between gap-4 mt-4"
                     >
                        <div className="flex items-start gap-4 flex-col">
                           <Image
                              alt="product"
                              src={
                                 item.spu.images?.length > 0
                                    ? item.spu.images[0]?.imgUrl
                                    : "https://via.placeholder.com/150"
                              }
                              width={500}
                              height={500}
                              className="w-auto rounded-lg h-[100px] border"
                           />
                           <div className="">
                              <h4 className="">{item.skuName}</h4>
                              <div className="text-gray-400 text-sm flex items-center justify-start gap-1">
                                 <FontAwesomeIcon icon={faX} className="w-[8px] h-[8px]" />
                                 <p className="mb-0 pb-0 text-[16px]">{item.quantity}</p>
                              </div>
                           </div>
                        </div>
                        <div>
                           <p>
                              {formatCurrency(
                                 Math.round(
                                    item.quantity *
                                    (item.skuPrice * (1 - item.spuDiscount / 100)),
                                 ),
                              )}
                           </p>
                        </div>
                     </div>
                  ))}
               <div className="mt-4 py-4 border-t flex items-center justify-center w-full">
                  <div className="flex items-center justify-center gap-4 flex-col w-full">
                     <Field
                        name={"discount"}
                        placeholder={"Mã giảm giá"}
                        errorMessage={discountError}
                        value={discountCode}
                        onChange={(text) => {
                           setDiscountCode(text);
                        }}
                     />

                     <button
                        className="bg-orange-400 rounded-lg text-white w-full min-w-[140px] p-4 text-sm"
                        onClick={checkDiscount}
                     >
                        Áp dụng
                     </button>
                  </div>
               </div>
               <div className="border-t mt-2">
                  <div>
                     <div className="flex items-center justify-between gap-4 mt-4">
                        <div>
                           <h4 className="font-semibold">Tạm tính</h4>
                        </div>
                        <div>
                           <p>{formatCurrency(Math.round(total))}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between gap-4 mt-4">
                        <div>
                           <h4 className="font-semibold">Phí vận chuyển</h4>
                        </div>
                        <div>
                           <p>{formatCurrency(Math.round(shippingFee))}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between gap-4 mt-4">
                        <div>
                           <h4 className="font-semibold">Giảm giá</h4>
                        </div>
                        <div>
                           {/* <p>{formatCurrency(discountCode)}</p> */}
                           <p>
                              {formatCurrency(
                                 Math.round(total * (discountPercent / 100)),
                              )}
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between gap-4 mt-4 border-t pt-4">
                        <div>
                           <h4 className="font-semibold">Tổng</h4>
                        </div>
                        <div>
                           <p>
                              {formatCurrency(
                                 Math.round(total * (1 - discountPercent / 100)),
                              )}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default OrderPage;
