"use client";

import { useState, useEffect } from "react";
import { Dispatch, SetStateAction, createContext, useContext } from "react";
type CartProviderProps = {
  children: React.ReactNode;
};
type CartContextType = {
  productsInCart: string[];
  setProductsInCart: Dispatch<SetStateAction<string[]>>;
  addToCartById: (productId: string) => void;
  removeFromCartById: (productId: string) => void;
  clearCart: () => void;
  favouriteProducts: string[];
  addToFavouriteById: (productId: string) => void;
  removeFromFavouriteById: (productId: string) => void;
  isProductInFavourites: (productId: string) => boolean;
} | null;

const CartContext = createContext<CartContextType>(null);

function CartContextProvider({ children }: CartProviderProps) {
  // useLocalStorageState - custom hook for synchronization between state and local storage.
  // Not imported from separate file because all context stuff needs to be in one place for lazyload
  // Otherwise got lot of errors related to window is undefined
  function useLocalStorageState<T>(
    initialState: T,
    key: string
  ): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState(function () {
      const storedValue = window?.localStorage?.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    });

    useEffect(
      function () {
        localStorage.setItem(key, JSON.stringify(value));
      },
      [value, key]
    );

    return [value, setValue];
  }

  //--------------------------CART---------------------------------
  const [productsInCart, setProductsInCart] = useLocalStorageState<
    Array<string>
  >([], "productsInCart");

  const addToCartById = (productId: string) => {
    setProductsInCart((prev) => [...prev, productId]);
  };

  const removeFromCartById = (productId: string) => {
    setProductsInCart((prev) => prev.filter((id) => id !== productId));
  };

  const clearCart = () => {
    setProductsInCart([]);
  };

  //------------------FAVOURITE PRODUCTS----------------------------
  const [favouriteProducts, setFavouriteProducts] = useLocalStorageState<
    Array<string>
  >([], "favouriteProducts");
  const addToFavouriteById = (productId: string) => {
    setFavouriteProducts((prev) => [...prev, productId]);
  };
  const removeFromFavouriteById = (productId: string) => {
    setFavouriteProducts((prev) => prev.filter((id) => id !== productId));
  };
  const isProductInFavourites = (productId: string) => {
    return favouriteProducts.includes(productId);
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        setProductsInCart,
        addToCartById,
        removeFromCartById,
        clearCart,
        favouriteProducts,
        addToFavouriteById,
        removeFromFavouriteById,
        isProductInFavourites,
      }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}

export { useCart };
export default CartContextProvider;
