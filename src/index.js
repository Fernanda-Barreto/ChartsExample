/* import { useEffect, useState } from "react";
import getMaterials from './services/material'; */
import { App } from "./App";

export function BarChart() {
  /*  const page = 1;
   const ITEMS_PER_PAGE = 10;
   const [materials, setMaterials] = useState([]);
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await getMaterials(page, ITEMS_PER_PAGE);
         const error = response.error;
         const pageData = response.page;
 
         if (!error.status) {
           if (Array.isArray(pageData.content)) {
             setMaterials(pageData.content);
           }
 
         } else {
           setMaterials([]);
         }
       } catch (error) {
         console.error("Erro:", error.message);
       }
     }
 
     console.log(materials);
 
     fetchData(); // Chama a função fetchData aqui
   }, [page, ITEMS_PER_PAGE]); */

  return (
    <App
    />
  );
}