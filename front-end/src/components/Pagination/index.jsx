import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationItem from "../PaginationItem";
import { useProductProvider } from "@/contexts/ProductProvider";



export default function Pagination(){
    const {totalPages,currentPage,setCurrentPage,numberOfElements} = useProductProvider();

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="my-3 flex items-center gap-2">
            <span>{numberOfElements}</span>
            <PaginationItem isDisable={(currentPage === 1)} onClick={()=>setCurrentPage(1)}>
                start       
            </PaginationItem>
            <PaginationItem isDisable={(currentPage === 1)} onClick={()=>currentPage !== 1 && setCurrentPage(currentPage - 1)}>
                pre      
            </PaginationItem>
            {
                Array.from({length: totalPages}).map((_,index) => (
                    <PaginationItem onClick={()=>handleClick(index + 1)} isActice={currentPage === (index + 1)} key={index}>{index + 1}</PaginationItem>
                ))
            }
            <PaginationItem isDisable={(currentPage === totalPages)} onClick={()=>currentPage !== (totalPages) && setCurrentPage(currentPage + 1)}>
                next      
            </PaginationItem>
            <PaginationItem isDisable={(currentPage === totalPages)} onClick={()=>setCurrentPage(totalPages)}>
                end      
            </PaginationItem>
        </div>
    )
}