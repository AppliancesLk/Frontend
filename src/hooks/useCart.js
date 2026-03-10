// hooks/useBrands.ts
import { useEffect, useState } from "react";
import { addcartItem , getCartItem } from "../api/cart.api";

export const useCart = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [cartItem , setCartItem] = useState([]);
  

  const addCartItem = (item)=>{
    addcartItem(item)
      .then((res) => setBrands(res))
      .finally(() => {setLoading(false); setSuccess(true)});
  }

  
  const getCartItems = ()=>{
    getCartItem().then((res) => {setCart(res?.cart); setCartItem(res?.items) })
  }
  return { addCartItem , success, loading , getCartItems , cartItem };
};
