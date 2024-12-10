import AppProvider from "@/contexts/AppProvider";
import Providers from "@/contexts/Providers";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GoToTopButton from "@/components/GoToTopButton";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <Providers>
      <AppProvider>
        <Header />
        {children}
        <GoToTopButton />
        <ToastContainer />
        <Footer />
      </AppProvider>
    </Providers>
  )
}