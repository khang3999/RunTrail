import { useProductProvider } from "@/contexts/ProductProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AxiosInstance from "@/utils/axiosInstance";

function Breadcrumb() {
  const { setCategoryId, tempSelectedBrands, categoryId, setSelectedBrands } = useProductProvider();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log(tempSelectedBrands, 'tempppp');

  }, [tempSelectedBrands])

  // use Axios Instance
  const fetchBrandName = async () => {
    AxiosInstance.get(`brands/by-status?statusId=1`)
      .then((response) => {
        const data = response.data;
        setDataBrands(data.metadata)
      })
      .catch((error) => {
        console.error("Error fetching attributes", error);
      });
  };
  useEffect(() => {
    fetchBrandName()
  }, [])

  const buildBreadcrumb = (category) => {
    const breadcrumb = [];
    let currentCategory = category;

    while (currentCategory) {
      breadcrumb.unshift(currentCategory);
      currentCategory = currentCategory.parent;
    }
    setBreadcrumbItems(breadcrumb);
    // console.log(bre);

  };

  useEffect(() => {
    // Nếu categoryId khác -1 (có danh mục được chọn) thì fetchCategory
    if (categoryId !== -1) {
      AxiosInstance.get(`categories${categoryId && `/${categoryId}`}`)
        .then((response) => {
          const data = response.data;
          if (data) {
            buildBreadcrumb(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching attributes", error);
        });
    } else {
      setBreadcrumbItems([]);
    }
  }, [categoryId, tempSelectedBrands]);



  const handleNavigate = (id) => {
    setCategoryId(id);
    router.push(`/product`);
  };

  useEffect(() => {
    const newArray = dataBrands
      .filter((brand) => tempSelectedBrands.includes(brand.id.toString())) // Lọc theo selectedIds
      .map((brand) => ({
        id: brand.id,
        name: brand.brandName,
        parent: null, // Gán giá trị parent = null
      }));
    // console.log(newArray);

    setBreadcrumbItems(newArray)

    // console.log(breadcrumbItems);
  }, [dataBrands, tempSelectedBrands])

  useEffect(() => {


  }, [])
  return (
    <div className="md:px-20 px-5 py-10 flex items-center space-x-2 md:text-base text-sm">
      <span
        onClick={() => {
          setCategoryId(-1)
          setSelectedBrands([])
          router.push('/')
        }}
        className="hover:underline cursor-pointer"
      >
        Trang chủ
      </span>
      {categoryId == -1
        ?
        <span className="flex items-center">
          {breadcrumbItems.length == 0 ? '' : <span className="mx-2">{">"}</span>}
          {breadcrumbItems.map((item, index) => (
            <span key={index}>
              {item.name}
              {index !== breadcrumbItems.length - 1 && (
                <span className="mx-2">{"&"}</span>
              )}
            </span>
          ))}
        </span>
        :
        breadcrumbItems.map((item, index) => (
          <span key={index} className="flex items-center">
            <span className="mx-2">{">"}</span>
            <span
              onClick={() => {
                handleNavigate(item.id);
              }}
              className="hover:underline cursor-pointer"
            >
              {item.name}
            </span>
          </span>
        ))
      }

    </div>
  );
}

export default Breadcrumb;