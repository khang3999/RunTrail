"use client";
import { Menu } from "antd";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useProductProvider } from "@/contexts/ProductProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const { SubMenu } = Menu;
const MenuComponent = ({ categories }) => {
  const { setProducts, setCategoryId } = useProductProvider();

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
  };
  console.log("Testing");

  const renderMenuItems = (parentId) => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => {
        if (category.parentId === null) {
          return (
            <SubMenu
              key={category.id}
              title={category.name}
              onTitleClick={() => {
                console.log(category.id);
                handleCategoryChange(category.id);
              }}
            >
              {renderMenuItems(category.id)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
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
    <NavDropdown title="Link" id="navbarScrollingDropdown">
      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
      <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
    </NavDropdown>
  );
}
