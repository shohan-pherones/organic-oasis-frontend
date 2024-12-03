import { ICartItem } from "@/interfaces";
import {
  addItem,
  clearCart,
  removeItem,
} from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useCart = () => {
  const { items, shippingCost, subtotal, tax, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const addItemDispatcher = (item: ICartItem) => {
    dispatch(addItem(item));
  };

  const removeItemDispatcher = (id: string) => {
    dispatch(removeItem(id));
  };

  const clearCartDispatcher = () => {
    dispatch(clearCart());
  };

  return {
    items,
    shippingCost,
    subtotal,
    tax,
    totalPrice,
    addItemDispatcher,
    removeItemDispatcher,
    clearCartDispatcher,
  };
};

export default useCart;
