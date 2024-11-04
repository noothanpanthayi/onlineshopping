'use client';

import React from 'react';
import Image from 'next/image'


const Product = ({data}:any) => {

const addToCart=()=>{
    alert("add to cart")
}

  return <>
    {data?.map(({ id, title, description, price, images }) => {
        const imgsrc = images[0];

        return <>
          <div className="card">
            <div className="img">
              <Image
                src={imgsrc}
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
                <li><button onClick={addToCart} className="addtocart">Add to Cart</button></li>
              </ul>
            </div>
          </div>
        </>
      })}
  </>
}

export default Product