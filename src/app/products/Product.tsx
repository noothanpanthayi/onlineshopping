"use client";

import React, { Fragment } from "react";
import Image from "next/image";

const Product = ({ data }: any) => {
  const addToCart = () => {
    alert("add to cart");
  };

  type Props = {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
  };

  return (
    <>
      {data?.map(({ id, title, description, price, image }: Props) => {
        console.log("Image ", image);
        return (
          <Fragment key={id}>
            <div className="card">
              <div className="img">
                <Image
                  title={title}
                  src={image}
                  height={180}
                  width={180}
                  alt="images from web"
                />
              </div>
              <div className="prodInfo">
                <ul>
                  <li className="title">{title}</li>
                  <li className="desc">{description}</li>
                  <li className="price">${price}</li>
                  <li>
                    <button onClick={addToCart} className="addtocart">
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default Product;
