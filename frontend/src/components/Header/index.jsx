"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Input } from "antd";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import Search from "antd/es/transfer/search";
import CartIcon from "../CartIcon";
import { useAppProvider } from "@/contexts/AppProvider";

export default function Header({ onCategoryClick }) {
  const { totalCart } = useAppProvider();
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

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };
  const handleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsDropdownOpen(false);
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // console.log(searchValue);
  };
  useEffect(() => {
    if (searchValue) {
      fetch(`http://localhost:8008/api/v1/spu/search?key=${searchValue}`)
        .then((response) => response.json())
        .then((data) => {
          setProductsSearch(data.metadata);
        });
    }
  }, [searchValue]);
  // console.log(productsSearch);
  const handleProductClick = () => {
    setSearchValue("");
    setIsSearchOpen(false);
  };

  return (
    <div className={styles.container}>
      <MdOutlineMenu className={styles.menuIcon} color="white" size={20} />
      <Link href="/">
      <img
        src="https://supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02_c46e0135-659a-49a2-9b37-6afebf1112e4.jpg?v=1723429659&width=2082"
        className={styles.logo}
        alt="Super sport Logo"
      />
      </Link>
      <div className={styles.boxRight}>
        <div style={{ position: "relative", marginRight: 20 }}>
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

        {/* cart icon in header */}
        <CartIcon cartTotal={totalCart} />
        {/* end cart icon in header */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
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
                <div>
                  <div
                    key={language.code}
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
          {(isSearchOpen || searchValue !== "") && (
            <div className={styles.searchOpen}>
              <Search
                placeholder="Tìm sản phẩm ..."
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          )}
          {productsSearch.length > 0 && searchValue.length > 0 ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
