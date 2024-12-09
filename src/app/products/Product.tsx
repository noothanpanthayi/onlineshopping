"use client";
import React, { ChangeEventHandler, Fragment } from "react";
import { useRouter } from "next/navigation";
import { getHost } from "../api/getHost";
import Image from "next/image";

const Product = ({ data }: any) => {
  const router = useRouter();
  const addToCart = async (e: ChangeEventHandler | any) => {
    try {
      let localhost = process.env.NEXT_PUBLIC_LOCALHOST;

      const configuration = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS", 
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
        body: JSON.stringify({
          userid: "1001",
          productid: parseInt(e.target.id),
        }),
      };

      const response = await fetch(`${getHost()}/api`, configuration);
      alert(`${e.target.title}\nhas been Added to the Cart`);
      router.push("/cart");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  type Props = {
    id: string;
    productid: string;
    title: string;
    description: string;
    price: string;
    image: string;
  };

  return (
    <>
      {data?.map(
        ({ id, productid, title, description, price, image }: Props) => {
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
                      <button
                        id={productid}
                        title={title}
                        onClick={addToCart}
                        className="addtocart"
                      >
                        Add to Cart
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </Fragment>
          );
        }
      )}
    </>
  );
};

export default Product;
