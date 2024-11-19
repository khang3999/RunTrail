import ProductDetail from "@/components/ProductDetail";
import PageTitle from "@/components/PageTitle";

const BASE_URL = process.env.BASE_URL || "http://localhost:8008/api/v1";
const NODE_ENV = process.env.NODE_ENV || "development";

// export async function generateStaticParams() {
//   if (NODE_ENV !== "production") return [];
//   const { metadata: slugs } = await fetch(
//     `${BASE_URL}/spu/all-slug`,
//   ).then((res) => res.json());
//   return slugs.map((slug) => ({
//     slug,
//   }));
// }
  

export default function ProductDetailPage({ params }) {
  
  const { slug } = params;
  
  return (
    <PageTitle title={"Product Detail"}>
      <ProductDetail slug={slug} />
    </PageTitle>
  );
}
