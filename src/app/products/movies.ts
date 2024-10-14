"use server";

export const getMovies=async()=>{
const data=await fetch("https://dummyapi.online/api/movies");
return data.json();
}