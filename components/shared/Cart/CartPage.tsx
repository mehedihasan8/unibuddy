"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return <p className="text-center text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {items.map((item) => (
        <div key={item.id} className="border p-4 flex justify-between items-center mb-2">
          <div>
            <h3 className="text-lg">{item.name}</h3>
            <p className="text-gray-500">${item.price.toFixed(2)} each</p>
            <p className="text-gray-700">Added: {item.userQuantity}</p>
            <p className="text-red-500">Stock: {item.quantity}</p>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max={item.quantity}
              value={item.userQuantity}
              className="border p-1 w-12 text-center"
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, userQuantity: Number(e.target.value) }))
              }
            />
            <Button
              variant="destructive"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-4">Total: ${totalAmount.toFixed(2)}</h3>

      <Button className="mt-4 w-full" variant="destructive" onClick={() => dispatch(clearCart())}>
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;
