import PaginationItem from "../PaginationItem";
import { useProductProvider } from "@/contexts/ProductProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsU,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Pagination() {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    numberOfElements,
    setFirstFilter,
  } = useProductProvider();

  const handleClick = (page) => {
    setCurrentPage(page);
    setFirstFilter(false);
  };

  return (
    <div className="my-3 flex items-center gap-2">
      <PaginationItem
        isDisable={currentPage === 1}
        onClick={() => handleClick(1)}
      >
        start
      </PaginationItem>
      <PaginationItem
        isDisable={currentPage === 1}
        onClick={() => currentPage !== 1 && handleClick(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="fa-fw" />
      </PaginationItem>
      {Array.from({ length: totalPages }).map((_, index) => (
        <PaginationItem
          onClick={() => handleClick(index + 1)}
          isActice={currentPage === index + 1}
          key={index}
        >
          {index + 1}
        </PaginationItem>
      ))}
      <PaginationItem
        isDisable={currentPage === totalPages}
        onClick={() =>
          currentPage !== totalPages && handleClick(currentPage + 1)
        }
      >
        <FontAwesomeIcon icon={faChevronRight} className="fa-fw" />
      </PaginationItem>
      <PaginationItem
        isDisable={currentPage === totalPages}
        onClick={() => handleClick(totalPages)}
      >
        end
      </PaginationItem>
    </div>
  );
}
