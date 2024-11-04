import React, { Fragment } from "react";
import "./style.css";
import Product from "./Product";

const Page = async () => {
  // Server Side Data Fetch, by default this will be cached and
  //pre rendered during the build

  let response = await fetch(
    "https://api.escuelajs.co/api/v1/categories/3/products"
  );

  const addtocart = (title) => {
    alert(`${title} has been added to cart!`);
  };

  let data = await response.json();

  return (
    <div className="page">
      <div className="hdrcontainer">
        <div className="techdesc">
          NextJs Demo of Server Side Rendering(SSR)
        </div>
        <div className="hdrpanel">Product Listing Page</div>
      </div>

      <div className="vspacer"></div>

      <Product data={data} />
    </div>
  );
};

export default Page;
