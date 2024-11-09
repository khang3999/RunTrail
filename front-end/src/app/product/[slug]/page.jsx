import ProductDetail from "@/components/ProductDetail";
import PageTitle from "@/components/PageTitle";
export function generateStaticParams(){
  return [
      {
          slug: "adidas-superstar",
      }
  ]
}

export default function ProductDetailPage({params}) {
const {slug} = params;
return (
  <PageTitle title={"Product Detail"}>
    <ProductDetail slug={slug} />
  </PageTitle>
);
}
