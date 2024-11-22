"use client";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {getHost} from '../api/getHost';
import { useRouter } from "next/navigation";

export const DeleteProduct = ({ cart }) => {
  const router = useRouter();

  const [state, setState] = useState({
    cart,
  });

  const fetchData = async () => {
    let localhost = process.env.NEXT_PUBLIC_LOCALHOST;
    let response = await fetch(`${getHost()}/api?mode=cart`, {
      cache: "no-store",
    });

    let cart = await response.json();

    setState((prevState) => {
      return {
        ...prevState,
        cart,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [cart.length, router.pathname]);

  const deleteCart = async (e) => {
    // if (!confirm(`Are you Sure you want to Delete:\n${e.target.title}?`)) return;
    try {
      let localhost = process.env.NEXT_PUBLIC_LOCALHOST;

      const configuration = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: "1001",
          id:parseInt(e.target.id),
        }),
      };

      const response = await fetch(`${getHost()}/api?mode=del`, configuration);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        fetchData();
      }

      const data = await response.json();
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  const navToShop=()=>{
    router.push('/products')
  }

  return (
    <div className={grid}>
      <div className={title}>Shopping Cart</div>
      <div>Sl.No</div>
      <div>Product</div>
      <div>Title</div>
      <div>Action</div>

      {state.cart?.map(({ id, userid, productid, title, image }, index) => {
        return (
          <Fragment key={id}>
            <div className={slno}>{index + 1}</div>
            <Image
              className={imgFrame}
              title={title}
              src={image}
              height={100}
              width={100}
              alt="images from web"
            />
            <div className={desc}>{title}</div>
            {/* <div id={productid} onClick={deleteCart} className={del}> */}
            <div id={id} title={title} onClick={deleteCart} className={del}>
              🗑️
            </div>
          </Fragment>
        );
      })}
      <div className={btnContainer}>
        <button onClick={navToShop}>Continue Shopping</button>
      </div>
    </div>
  );
};

const { grid, imgFrame, title, del, desc, btnContainer,slno} = styles;
