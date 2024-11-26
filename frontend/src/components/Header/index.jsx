"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { Input } from "antd";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import Search from "antd/es/transfer/search";
import CartIcon from "../CartIcon";
import { useAppProvider } from "@/contexts/AppProvider";
import { Drawer } from "flowbite";
import MenuMobile from "@/components/Menu/MenuMobile";

export default function Header({ onCategoryClick }) {
  const { totalCart, handleToggleMenu, isHidden } = useAppProvider();
  const languages = [
    {
      name: "Vietnam",
      code: "VN",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1024px-Flag_of_Vietnam.svg.png",
    },
    {
      name: "United Kingdom",
      code: "UK",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png",
    },
    {
      name: "Japan",
      code: "JP",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png",
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [productsSearch, setProductsSearch] = useState([]);
  const drawerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Đổi ngôn ngữ
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  // Mở khung tìm kiếm mobile
  const handleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsDropdownOpen(false);
  };

  // Tìm kiếm sản phẩm liên tục
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue.trim()) {
        fetch(`http://localhost:8008/api/v1/spu/search?key=${searchValue}`)
          .then((response) => response.json())
          .then((data) => {
            setProductsSearch(data.metadata || []);
          });
      } else {
        setProductsSearch([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  // Xử lý khi click vào sản phẩm
  const handleProductClick = () => {
    setSearchValue("");
    setIsSearchOpen(false);
  };

  // Xử lý khi click ra ngoài dropdown hoặc search
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsSearchOpen(false);
      setSearchValue("");
      setProductsSearch([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (drawerRef.current) {
      const options = {
        placement: "left",
      };
      const drawer = new Drawer(drawerRef.current, options);

      if (!isHidden) {
        drawer.show();
      } else {
        drawer.hide();
      }
    }
  }, [isHidden]);

  return (
    <div className={styles.container}>
      <MdOutlineMenu className={styles.menuIcon} color="white" size={20} onClick={handleToggleMenu} />
      <Link href="/">
        <img
          src="https://supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02_c46e0135-659a-49a2-9b37-6afebf1112e4.jpg?v=1723429659&width=2082"
          className={styles.logo}
          alt="Super sport Logo"
        />
      </Link>
      <div className={styles.boxRight}>
        <div style={{ position: "relative", marginRight: 20 }} ref={searchRef}>
          <input
            className={styles.search}
            placeholder="Tìm sản phẩm ..."
            onChange={handleSearchChange}
            value={searchValue}
          />
          <CiSearch
            onClick={handleSearchOpen}
            size={20}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            className={styles.searchIconDecktop}
          />
        </div>
        <CiSearch
          onClick={handleSearchOpen}
          size={20}
          className={styles.searchIcon}
        />
        <FaUserCircle className={styles.profile} color="white" size={24} />

        <CartIcon cartTotal={totalCart} />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
          ref={dropdownRef}
        >
          <img
            className={styles.iconFlag}
            src={selectedLanguage.image}
            alt={selectedLanguage.name}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsSearchOpen(false);
              setProductsSearch([]);
            }}
            style={{ cursor: "pointer" }}
          />
          <FaChevronDown
            color="white"
            size={15}
            className={styles.iconDown}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsSearchOpen(false);
              setProductsSearch([]);
            }}
            style={{ cursor: "pointer" }}
          />
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {languages.map((language) => (
                <div key={language.code}>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => handleLanguageChange(language)}
                  >
                    <img
                      src={language.image}
                      alt={language.name}
                      className={styles.iconFlag}
                    />
                    <div className="truncate">{language.name}</div>
                  </div>
                  <div
                    style={{ width: "100%", height: 0.1, background: "#ccc" }}
                  />
                </div>
              ))}
            </div>
          )}
          {isSearchOpen && (
            <div className={styles.searchOpen}>
              <Search
                placeholder="Tìm sản phẩm ..."
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          )}
          {productsSearch.length > 0 && searchValue.length > 0 && (
            <div className={styles.searchResult}>
              {productsSearch.map((product) => (
                <div key={product.id} className={styles.searchItem}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={handleProductClick}
                    className={styles.productLink}
                  >
                    <img
                      src={product.images[0].imgUrl}
                      alt={product.spuName}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <div className={styles.productName}>
                        {product.spuName}
                      </div>
                      <div className={styles.productPrice}>
                        {product.spuPrice}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MenuMobile drawerRef={drawerRef}/>
    </div>
  );
}
