// components/ProductCard.js
"use client";
import { Button } from "@/components/ui/button";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

const MenuCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(useSelectCurrentUser);

  const handelAddToCard = () => {
    if (!user) {
      toast.warning("Please login first!")
      router.push("/register")
      return
    }

    if (user) {
      toast.success("Add to card success!")
      dispatch(addToCart({ ...product, userQuantity: 1 }))
    }
  }

  return (
    <div className="border shadow-md p-4 bg-white w-full">
      <div className="h-[200px] overflow-hidden ">
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="w-full h-full object-center object-cover hover:scale-110 transition"
        />
      </div>
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-green-600 font-bold mt-2">${product.price}</p>
        <p className="text-green-600 font-bold mt-2">
          Quantity {product.quantity}
        </p>
      </div>
      <Button
        onClick={handelAddToCard}
        className="mt-4 py-5 w-full"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default MenuCard;
