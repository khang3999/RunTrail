"use client";
import { Menu } from "antd";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useCategory } from "@/contexts/CategoryContext";

const { SubMenu } = Menu;
const MenuComponent = ({ categories, openKeys, onOpenChange }) => {
  const { setSelectedCategory } = useCategory();
  const renderMenuItems = (parentId) => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => {
        if (category.parentId === -1) {
          return (
            <SubMenu
              key={category.id}
              title={category.name}
              onTitleClick={() => {
                setSelectedCategory(category.id);
              }}
            >
              {renderMenuItems(category.id)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Menu.Item>
          );
        }
      });
  };

  return (
    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
      {renderMenuItems(-1)}
    </Menu>
  );
};

export default function CategoryFilter() {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8008/api/categories");
        const data = await response.json();
        console.log(data);
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton count={10} />
      ) : (
        <MenuComponent
          categories={categories}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
}
