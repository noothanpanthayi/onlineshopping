// import { sql } from "@vercel/postgres";

import {Client} from 'pg';

import { NextRequest, NextResponse } from "next/server";


const client = new Client({ 
  connectionString: process.env.POSTGRES_URL, 
  ssl: { rejectUnauthorized: false
  // ca: process.env.NODE_ENV === 'production' ? require('fs').readFileSync('./rds-combined-ca-bundle.pem').toString() : undefined, 
  }
});

client.connect() .then(() => console.log('Connected to AWS PostgreSQL')) .catch(err => console.error('>>Connection error', err.stack));


export async function GET(request: NextRequest) {
  
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') { 
       return NextResponse.json({}, { headers, status: 204 }); 
  }


  switch (mode) {
    case "products":
      const products = await client.query(`select * from products`);
      const json = products.rows;
      return Response.json(json);
    case "cart":
      const cart = await client.query(`SELECT shoppingcart.id, shoppingcart.userid, shoppingcart.productid, 
          products.image, shoppingcart.quantity, products.title, products.price, products.description 
          FROM shoppingcart JOIN products ON shoppingcart.productid = products.productid`);

      const cartData = cart.rows;
      return Response.json(cartData, {headers, status:200});
  }
}

export async function POST(request: NextRequest) {
  const { userid, productid, id } = await request.json();
  
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

 if (mode==="del"){
  try {
    const result= await client.query(`delete from shoppingcart where id=${id}`)
    return NextResponse.json({message:'Item deleted successfully'}, {status:200})
  }catch(error){
    return NextResponse.json({error:'Internal Server Error'}, {status:500})

  }

 }
 else {
  if (!userid || !productid) {
    return NextResponse.json({ error: "Missing userid or itemid" });
  }

  try {
    const result = await client.query(`insert into shoppingcart (userid, productid) values (${userid}, ${productid})`);
    return NextResponse.json({ rowCount: result.rowCount }, { status: 201 });
  } catch (error) {
    console.error("Error inserting into shoppingcart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
 }

  
}

// try{
//   await sql`insert into auto (make,model, price, year) values (
//       'Rollce Royce','Class 1','100000.00',2024);`
//     } catch (error){
//       return response.status(500).json({error})
//     }
