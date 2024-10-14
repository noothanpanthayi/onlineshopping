'use server'

export const getProducts = async () => {
  const data = await fetch(
    'https://api.escuelajs.co/api/v1/categories/5/products',
  )
  return data.json()
}
