// 'use client'
import React, { Fragment } from 'react'
import './style.css'
import Image from 'next/image'

const Page = async () => {// Server Side Data Fetch, by default this will be cached and 
  //pre rendered during the build
  let response = await fetch(
    'https://api.escuelajs.co/api/v1/categories/3/products',
  )

  /* This will not cache the response
 let response = await fetch(
    'https://api.escuelajs.co/api/v1/categories/2/products',
     { cache: 'no-store' }
  )
  */

  const addtocart=(title)=>{
    alert(`${title} has been added to cart!`)
  }

  let data = await response.json()

  return (
    <div className="page">
       <div className="hdrcontainer">
       <div className="techdesc">NextJs Demo of Server Side Rendering(SSR)</div>
       <div className="hdrpanel">Product Listing Page</div>

       </div>
        
        <div className="vspacer"></div>

      {data?.map(({ id, title, description, price, images }) => {
        const imgsrc = images[0]

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
                {/* <li><button className="addtocart">Add to Cart</button></li> */}


                
              </ul>
            </div>
          </div>
        </>

        //         return <div className="card" key={id}>
        //         <div className="card">
        //            <div className="image">
        //             {imgsrc}

        //           <Image src={imgsrc}
        //         height={150}
        //         width={150}
        //         alt="images from web"/>
        //         </div>
        //         <div>{title}</div>
        //         <div>{description}</div>
        //         </div>
        // </div>
      })}
    </div>
  )
}

export default Page
