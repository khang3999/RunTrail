import { useProductProvider } from "@/contexts/ProductProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Breadcrumb({ categoryId = -1 }) {
  const { setCategoryId } = useProductProvider();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const router = useRouter();

  const fetchCategory = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8008/api/categories${id && `/${id}`}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const buildBreadcrumb = (category) => {
    const breadcrumb = [];
    let currentCategory = category;

    while (currentCategory) {
      breadcrumb.unshift(currentCategory);
      currentCategory = currentCategory.parent;
    }

    setBreadcrumbItems(breadcrumb);
  };

  useEffect(() => {
    // Nếu categoryId khác -1 (có danh mục được chọn) thì fetchCategory
    if (categoryId !== -1) {
      fetchCategory(categoryId).then((category) => {
        if (category) {
          buildBreadcrumb(category);
        }
      });
    } else {
      // Nếu là trang chủ, chỉ hiển thị mỗi "Trang chủ"
      setBreadcrumbItems([]);
    }
  }, [categoryId]);

  if (breadcrumbItems.length === 0 && categoryId === -1) {
    // Nếu breadcrumb rỗng và categoryId là -1 (tức là trang chủ), chỉ hiển thị Trang chủ
    return (
      <div className="px-20 py-10 flex items-center space-x-2 text-base">
        <span className="hover:underline cursor-pointer">Trang chủ</span>
      </div>
    );
  }

  const handleNavigate = (id) => {
    router.push(`/products`);
    if (id === -1) {
      setCategoryId(-1);
    } else {
      setCategoryId(id);
    }
  };

  return (
    <div className="md:px-20 px-5 py-10 flex items-center space-x-2 md:text-base text-sm">
      <span
        onClick={() => {
          handleNavigate(-1);
        }}
        className="hover:underline cursor-pointer"
      >
        Trang chủ
      </span>
      {breadcrumbItems.map((item, index) => (
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
      ))}
    </div>
  );
}

export default Breadcrumb;
