"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PaymentCheckout from "./PaymentCheckout";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false); // Modal state


  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return <p className="text-center text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="w-full mx-auto mt-8">
      <ScrollArea className="h-[400px] w-full px-4 py-8">


        {items.map((item) => (
          <div key={item.id} className="border p-4 flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg">{item.name}</h3>
              <p className="text-gray-500">${item.price.toFixed(2)} each</p>
              <p className="text-gray-700">Order Quantity : {item.userQuantity}</p>
              <p className="text-red-500">Stock: {item.quantity}</p>
            </div>

            {/* ✅ Custom Quantity Selector */}
            <div className="flex gap-2">
              <div className="inline-flex items-center">
                {/* Decrease Quantity */}
                <button
                  className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, userQuantity: item.userQuantity - 1 }))
                  }
                  disabled={item.userQuantity <= 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>

                {/* Quantity Display */}
                <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                  {item.userQuantity}
                </div>

                {/* Increase Quantity */}
                <button
                  className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, userQuantity: item.userQuantity + 1 }))
                  }
                  disabled={item.userQuantity >= item.quantity} // Prevent exceeding stock
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Remove Button */}
              <Button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </Button>
            </div>
          </div>
        ))}

        <h3 className="text-xl font-bold mt-4">Total: ${totalAmount.toFixed(2)}</h3>

        <div className="flex items-center justify-between gap-6">
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 w-[30%]">Order</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Checkout</DialogTitle>
              </DialogHeader>
              <PaymentCheckout totalAmount={totalAmount} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
          <Button className="mt-4 w-[30%]" variant={"outline"} onClick={() => dispatch(clearCart())}>
            Pre Order
          </Button>
          <Button className="mt-4 w-[30%]" variant={"destructive"} onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </div>
      </ScrollArea>

    </div>
  );
};

export default Cart;
