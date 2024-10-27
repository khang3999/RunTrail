'use client';
import React, { useEffect, useState } from 'react';

const AppContext = React.createContext();
function AppProvider({ children }) {
   const [theme, setTheme] = useState('light');
   const [isMobile, setIsMobile] = useState(false);

   // Resize when load page
   useEffect(() => {
      if (window.innerWidth <= 768) {
         setIsMobile(true);
      }
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
      window.addEventListener('resize', resize);
      return () => {
         window.removeEventListener("resize", resize);
      };
   }, []);

   return (
      <AppContext.Provider
         value={{
            theme,
            setTheme,
            isMobile,
            setIsMobile,
         }}
      >
         {children}
      </AppContext.Provider>
   );
}

export const useAppProvider = () => React.useContext(AppContext);

export default AppProvider;
