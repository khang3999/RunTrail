"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const AppContext = React.createContext();
function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isMobile, setIsMobile] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("none");
  const [isNotFound,setIsNotFound] = useState(false);
  const [isHidden, setIsHidden] = useState(true)
  // Resize when load page
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
    // get total cart
    getTotalCart();
  }, []);

  // // Resize event listener
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 768 && isMobile === false) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const getTotalCart = () => {
    const cart = Cookies.get("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      const temp = cartObj.reduce((total, item) => total + item.quantity, 0);
      setTotalCart(temp);
    }
    return 0;
  };
  const handleToggleMenu = () => {
    setIsHidden(prev => !prev)
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isMobile,
        setIsMobile,
        totalCart,
        setTotalCart,
        alertMessage,
        setAlertMessage,
        alertType,
        setAlertType,
        getTotalCart,
        isNotFound,
        setIsNotFound,
        isHidden, setIsHidden, handleToggleMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => React.useContext(AppContext);

export default AppProvider;
