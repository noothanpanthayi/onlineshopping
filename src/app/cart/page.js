
import React, { Fragment } from 'react';
import {getHost} from '../api/getHost';
import { DeleteProduct} from './DeleteProduct';

const Page = async() => {
  
  let localhost = process.env.NEXT_PUBLIC_LOCALHOST;
  let response = await fetch(`${getHost()}/api?mode=cart`, { cache: "no-store" });
  let cart=await response.json();

  return <>
      <DeleteProduct cart={cart}/>
  </>
}


export default Page