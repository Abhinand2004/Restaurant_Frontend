import "./css/items.css";
import { useState, useEffect } from "react";
import axios from "axios";
import glass1 from "./images/glass1.png";
import glass2 from "./images/glass2.png";
import url from "./url";
export default function Items({ selectedCategory }) {
  const [categoryItems, setCategoryItems] = useState([]); 
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/getmenuitem/${selectedCategory}`);
        setCategoryName(response.data.menuName || "Unknown Category"); 
        setCategoryItems(response.data.menuItems || []); 
      } catch (error) {
        console.error("Error fetching items:", error);
        setCategoryName("Unknown Category");
        setCategoryItems([]);
      }
      setLoading(false);
    };

    if (selectedCategory) {
      fetchCategoryData();
    }
  }, [selectedCategory]);

  return (
    <div className="items-body">
      <div className="items-body-container">
        <img src={glass1} alt="glass decoration" className="glass-one" />
        <img src={glass2} alt="glass decoration" className="glass-two" />
        <h1 className="items-body-header">---- {categoryName} ----</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <div className="items-grid">
            {categoryItems.length > 0 ? (
              categoryItems.map((item) => (
                <div key={item._id} className="item-card">
                  <p className="item-name-and-price">
                    <span className="item-name">{item.name} </span>
                    <span className="item-price">₹{item.price}</span>
                  </p>
                  <p className="item-description">{item.description}</p>
                </div>
              ))
            ) : (
              <p className="no-data">No items found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}