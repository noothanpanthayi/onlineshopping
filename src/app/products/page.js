import React, { Fragment } from "react";
import "./style.css";
import Product from "./Product";

const Page = async () => {
  // Server Side Data Fetch, by default this will be cached and
  //pre rendered during the build

  let response = await fetch(
    "https://fakestoreapi.com/products/"
  );

  const addtocart = (title) => {
    alert(`${title} has been added to cart!`);
  };

  let data = await response.json();

  return (
    <div className="page">
      <div className="hdrcontainer">
        <div className="techdesc">
        This NextJs AppRouter application makes an HTTP request to a free API url, renders the products list at the server-side and then sends to the client.
        Once it reaches the client, it gets hydrated and Add to Cart button becomes active.
        </div>
        <div className="hdrpanel">Product Listing Page <span className="subtitle">&nbsp;(NextJs Server Side Rendered)</span></div>
      </div>

      <div className="vspacer"></div>
      <Product data={data} />
    </div>
  );
};

export default Page;
