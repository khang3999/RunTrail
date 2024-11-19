import React, { createContext, useContext } from 'react'

// Kiểm tra slug in URL
const RouterContext = createContext();
function RouterProvider({ children }) {
   const searchParams = new URLSearchParams(window.location.search);
   const params = Object.fromEntries(searchParams.entries());

   return (
      <RouterContext.Provider value={{}}>{children}</RouterContext.Provider>
   )
}

export const useRouterProvider = () => {
   return useContext(RouterContext);
}

export default RouterProvider
