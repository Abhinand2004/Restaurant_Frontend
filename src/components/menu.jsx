import { useState, useEffect } from "react";
import axios from "axios";
import "./css/menu.css";
import Items from "./items";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getmenu"); 
        const fetchedCategories = res.data.menus || [];
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
          setSelectedCategory(fetchedCategories[0]._id); 
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="menuBody" id="menu">
      <div className="menuBodyTopSection">
        <h1 className="menuBodyHead1">MENU</h1>
        <p className="menuBodyPara">
          Please take a look at our menu featuring various categories. If <br />
          you'd like to place an order, use the "Order Online" button located
          below the menu.
        </p>
      </div>

      <div className="menuBodyCategorySection">
        {categories.map((category) => (
          <div
            key={category._id}
            className="menuCategory"
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <Items selectedCategory={selectedCategory} />
    </div>
  );
}