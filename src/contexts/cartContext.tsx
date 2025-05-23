import { createContext, useState, type ReactNode } from "react";
import type { ProductProps } from "../pages/home";

export interface CartContextData {
  cart: cartProps[];
  cartAmount: number;
  total: number;
  addItem: (item: ProductProps) => void;
  removeItem: (item: ProductProps) => void;
  calculate: (items: cartProps[]) => void;
  final: (items: cartProps[]) => Promise<void>;
}

interface cartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartContextProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export default function CartProvider({ children }: CartContextProps) {
  const [cart, setCart] = useState<cartProps[]>([]);
  const [total, setTotal] = useState(0);

  function addItem(item: ProductProps) {
    const indexItem = cart.findIndex((e) => e.id === item.id);

    if (indexItem !== -1) {
      const updatedCart = [...cart];
      updatedCart[indexItem].amount += 1;
      updatedCart[indexItem].total = updatedCart[indexItem].amount * updatedCart[indexItem].price;
      setCart(updatedCart);
      calculate(updatedCart);
      return;
    }

    const data: cartProps = {
      ...item,
      amount: 1,
      total: item.price,
    };

    const newCart = [...cart, data];
    setCart(newCart);
    calculate(newCart);
  }

  function removeItem(item: ProductProps) {
    const indexItem = cart.findIndex((e) => e.id === item.id);

    if (indexItem !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[indexItem].amount > 1) {
        updatedCart[indexItem].amount -= 1;
        updatedCart[indexItem].total = updatedCart[indexItem].amount * updatedCart[indexItem].price;
        setCart(updatedCart);
        calculate(updatedCart);
      } else {
        const filteredCart = cart.filter((e) => e.id !== item.id);
        setCart(filteredCart);
        calculate(filteredCart);
      }
    }
  }

  async function final(_: cartProps[]) {
  
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCart([]);
        setTotal(0);
        resolve();
      }, 1500);
    });
  }

  function calculate(items: cartProps[]) {
    const totalCalc = items.reduce((acc, obj) => acc + (obj.price * obj.amount), 0);
    setTotal(totalCalc);
  }

  return (
    <CartContext.Provider value={{ cart, cartAmount: cart.length, total, addItem, removeItem, calculate, final }}>
      {children}
    </CartContext.Provider>
  );
}
