import {sql} from '@vercel/postgres';


export async function GET() {

  // try{
  //   await sql`insert into auto (make,model, price, year) values (
  //       'Rollce Royce','Class 1','100000.00',2024);`
  //     } catch (error){
  //       return response.status(500).json({error})
  //     }
    
      const products=await sql`select * from products;`;
    
      const json=products.rows;
 

  return Response.json(json)
}
