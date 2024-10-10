'use client'
import { useProductProvider } from "@/contexts/ProductProvider";

export default function Test(){
    const {products} = useProductProvider();
    return(
        <div>a</div>
    )
}