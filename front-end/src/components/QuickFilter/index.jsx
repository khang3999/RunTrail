import {useProductProvider} from "@/contexts/ProductProvider";

const QuickFilter = () => {
    const {
        products,
        isLoading,
        currentPage,
        setCurrentPage,
        productsPerPage,
        totalPages,
        currentProducts,
    } = useProductProvider();

    return (
        <div className="quiz">
            <p>{((totalPages-1)*productsPerPage)+} san pham</p>
        </div>
    )
}
export default QuickFilter;