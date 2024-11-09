import React from 'react';
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { SlSocialInstagram, SlSocialYoutube } from "react-icons/sl";


const Footer = () => {
    return (
        <div>
            <div className="grid lg:grid-cols-4 w-full lg:px-[135px] lg:py-[40px] px-[25px] py-[10px] bg-[#858688] text-white">
                <div className="lg:pr-[30px] pt-[30px]">
                    <h3 className='lg:pb-[30px] font-bold'>GIỚI THIỆU</h3>
                    <p className='text-justify my-[15px] tracking-wide	'>SuperSports chuyên giày dép, quần áo và phụ kiện chạy bộ/chạy địa hình chính hãng đến từ các thương hiệu hàng đầu thế giới. Chúng tôi luôn có sẵn những dòng sản phẩm mới nhất, tối ưu và hiệu suất cao dành cho runners. Đội ngũ nhân viên trẻ trung, nhiệt huyết, là những chân chạy đã được tích luỹ nhiều kinh nghiệm tập luyện và thi đấu sẽ mang đến tinh thần phục vụ chuyên nghiệp và chuyên sâu nhất cho khách hàng</p>
                  
                </div>
                <div className=" lg:pr-[30px] pt-[30px]">
                    <div className="footer-block information-block">
                        <h3 className='lg:pb-[30px] font-bold'>ĐỊẠ CHỈ STORE</h3>
                        <p className='text-left text-white my-[7px] underline'><strong>HÀ NỘI</strong></p>

                        <p className='text-left text-white my-[7px]'>- Số 58A Ngõ 92, Thanh Nhàn, Hai Bà Trưng</p>
                        <p className='text-left text-white my-[7px]'>Hotline/Zalo: 0846 33 5858</p>

                        <p className='text-left text-white my-[7px]'>- B11, 423 Minh Khai, Hai Bà Trưng</p>
                        <p className='text-left text-white my-[7px]'>Hotline/Zalo: 0839 33 5858</p>

                        <p className='text-left text-white my-[7px]'>- 0105, Tòa Luxury Park Views, Trương Công Giai, Cầu Giấy</p>
                        <p className='text-left text-white my-[7px]'>Hotline/Zalo Tư vấn: 0879 33 5858</p>

                        <p className='text-left text-white my-[7px] underline'><strong>TP.HCM</strong></p>

                        <p className='text-left text-white my-[7px]'>Số 285/21 CMT8, Phường 12, Quận 10</p>
                    </div>

                </div>
                
                <div className="lg:pr-[30px] pt-[30px]">
                    <div className="footer-block contact-block">
                        <h3 className='lg:pb-[30px] font-bold'>HƯỚNG DẪN</h3>

                        <p className='text-left my-[7px]'>
                            <a style={{ color: 'rgb(0,0,0)' }} href="#" className="hover:text-cyan-500">
                                <span className="text-white hover:text-sky-800">Sản phẩm</span>
                            </a>
                        </p>

                        <p className='text-left my-[7px]'>
                            <a href="#" className="hover:text-cyan-500">
                                <span className="text-white hover:text-sky-800">Bản đồ</span>
                            </a>
                        </p>

                        <p className='text-left my-[7px]'>
                            <a href="#" className="hover:text-cyan-500">
                                <span className="text-white hover:text-sky-800">Chính sách thanh toán</span>
                            </a>
                        </p>

                        <p className='text-left my-[7px]'>
                            <a href="#" className="hover:text-cyan-500">
                                <span className="text-white hover:text-sky-800">Chính sách vận chuyển</span>
                            </a>
                        </p>

                        <p className='text-left my-[7px]'>
                            <a href="#" className="hover:text-cyan-500">
                                <span className="text-white hover:text-sky-800">Chính sách đổi trả và hoàn tiền</span>
                            </a>
                        </p>

                        <p className='text-left my-[7px]'>
                            <a href="#" className="hover:text-cyan-500">
                                <span className="text-white hover:text-sky-800" >Chính sách bảo hành</span>
                            </a>
                        </p>

                        <p className='text-left my-[7px]'>
                            <a href="#">
                                <span className="text-white hover:text-sky-800">Chính sách bảo mật</span>
                            </a>
                        </p>
                    </div>

                </div>
                <div className=" pb-[30px]">
                    <h3 className='lg:pb-[30px] font-bold pt-[30px]'>LIÊN HỆ</h3>
                    <a href="tel:+ 84 384 969 973">

                        <p className='text-left text-white my-[7px] hover:text-red-200'>Hotline/Zalo Tư vấn: 0384 969 973</p>
                    </a>
                    <a href="mailto: dongochieu333@gmail.com">

                        <p className='text-left text-white my-[7px] hover:text-amber-200'>Email: dongochieu333@gmail.com</p>
                    </a>
                    <ul className="h-10 py-3 md:w-[50%] lg:w-full grid grid-cols-4">
                        <li className='rounded-md h-5 w-5'>
                            <a className="" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <TiSocialTwitter className='rounded-md h-[40px] w-[40px] p-1 bg-slate-300 hover:text-cyan-400 hover:bg-white' />
                            </a>
                        </li>
                        <li>
                            <a className="" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <TiSocialFacebook className='rounded-md h-[40px] w-[40px] p-1 bg-slate-300 hover:text-blue-800 hover:bg-white' />

                            </a>
                        </li>
                        <li>
                            <a className="" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                                <SlSocialInstagram className='rounded-md h-[40px] w-[40px] p-1 bg-slate-300 hover:text-pink-600 hover:bg-white' />

                            </a>
                        </li>
                        <li>
                            <a className="" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-youtube" aria-hidden="true"></i>
                                <SlSocialYoutube className='rounded-md h-[40px] w-[40px] p-1 bg-slate-300 hover:text-red-500 hover:bg-white' />

                            </a>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
}

export default Footer;
