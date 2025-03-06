// components/ProductCard.js
"use client";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
// import { useDispatch } from "react-redux";
import Image from "next/image";
import { useSelector } from "react-redux";

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
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // ✅ Check if the product exists in the cart
  const cartProduct = cartItems.find((item) => item.id === product.id);
  const quantity = cartProduct ? cartProduct.quantity : 0;
  console.log("🚀 ~ MenuCard ~ quantity:", quantity);
  const userQuantity = cartProduct ? cartProduct.userQuantity : 0;
  console.log("🚀 ~ MenuCard ~ userQuantity:", userQuantity);

  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  console.log("🚀 ~ MenuCard ~ items:", items);
  console.log("🚀 ~ MenuCard ~ totalAmount:", totalAmount);

  //   if (items.length === 0) {
  //     return <p className="text-center text-lg">Your cart is empty.</p>;
  //   }

  //   const handleAddToCart = () => {
  //     dispatch(addToCart(product));
  //   };

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
        onClick={() => dispatch(addToCart({ ...product, userQuantity: 1 }))}
        className="mt-4 py-5 w-full"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default MenuCard;
