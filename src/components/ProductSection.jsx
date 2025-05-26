import { useContext, useState } from "react";
import { ProductContext } from "../context/index.js";
import ProductCard from "./ProductCard.jsx";

const ProductSection = () => {
  const { productState } = useContext(ProductContext);
  const [sortOption, setSortOption] = useState("Most Popular");

  const getSortedProducts = () => {
    const sorted = [...productState.productList];
    switch (sortOption) {
      case "Price: Low to High":
        return sorted.sort((a, b) => a.price - b.price);

      case "Price: High to Low":
        return sorted.sort((a, b) => b.price - a.price);
      case "Newest":
      default:
        return sorted;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Sort by:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} productItem={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
