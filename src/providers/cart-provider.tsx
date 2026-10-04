"use client";

import React, { useEffect } from "react";
import { useCartStore } from "../entities/cart/model/cart.store";

const CartProvider = () => {
  const loadServerCart = useCartStore((s) => s.loadServerCart);
  useEffect(() => {
    loadServerCart();
  }, [loadServerCart]);
  return null;
};

export default CartProvider;
