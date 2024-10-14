import React, { Fragment } from 'react'
import { getProducts } from './productlist';
import './style.css';
import Image from 'next/image';

const Products = async () => {


    const movies=await getProducts();


  return (
    <>
    {movies?.map(({id,title,images, description})=>{
        return <div className="card">
        <div className="card">
           <div className="image"> 
            <Image src={images[0]}
        height={150}
        width={150}
        alt="images from web"/>
        </div>
        <div>{title}</div>
        <div>{description}</div>
        </div>
</div>
    })}
    </>
    
  )
}

export default Products