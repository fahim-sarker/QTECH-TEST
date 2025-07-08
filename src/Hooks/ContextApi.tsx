import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";

export interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  stock: number;
  discountPercentage: number;
  description: string;
  category: string;
  brand: string;
}

export const ApidataContext = createContext<Product[]>([]);

interface ContextApiProps {
  children: ReactNode;
}

export const ContextApi = ({ children }: ContextApiProps) => {
  const [info, setInfo] = useState<Product[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        console.log("API response:", response.data);
        setInfo(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  return (
    <ApidataContext.Provider value={info}>{children}</ApidataContext.Provider>
  );
};
