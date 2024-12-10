import '@/styles/globals.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import '@/styles/homePage.css'
import '@/styles/imageDesktop.css'
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  );
}
