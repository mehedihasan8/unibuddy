

"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/firebase/firebaseConfig";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";

interface PreOrderCheckoutProps {
    totalAmount: number;
    onClose: () => void;
}

const PreOrderCheckout = ({ totalAmount, onClose }: PreOrderCheckoutProps) => {
    const user = useAppSelector(useSelectCurrentUser);
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.cart); // Get cart items
    const [paymentMethod, setPaymentMethod] = useState("");
    const [orderTime, setOrderTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!paymentMethod) {
            toast.error("Please select a payment method.");
            return;
        }

        if (!orderTime) {
            toast.error("Please select pre order time.");
            return;
        }

        if (!user) {
            toast.error("User not logged in. Please log in to place an order.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "orderHistory"), {
                userID: user?.id, // Store user ID
                products: items.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.userQuantity,
                    totalPrice: item.price * item.userQuantity
                })),
                totalAmount,
                paymentMethod,
                orderTime,
                timestamp: serverTimestamp(), // Store order timestamp
            });

            toast.success("Order placed successfully!");
            dispatch(clearCart());
            onClose();
        } catch (error) {
            console.error("Error storing order:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Total Amount: ${totalAmount.toFixed(2)}</h2>

            {/* Payment Options */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Select Payment Method:</label>
                <select
                    className="w-full p-2 mt-1 border rounded-md"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">-- Choose a Payment Method --</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                </select>
            </div>

            {/* Order time Options */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Select Order Time:</label>
                <select
                    className="w-full p-2 mt-1 border rounded-md"
                    value={orderTime}
                    onChange={(e) => setOrderTime(e.target.value)}
                >
                    <option value="">-- Choose a order time --</option>
                    <option value="35">35 Min After</option>
                    <option value="45">45 Min After</option>
                    <option value="55">55 Min After</option>
                </select>
            </div>

            {/* Card Details (if applicable) */}
            {paymentMethod === "credit-card" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                        type="text"
                        placeholder="1234 5678 9101 1121"
                        className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
                    />
                </div>
            )}

            {/* Pay Button */}
            <Button onClick={handlePayment} className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Confirm Payment"}
            </Button>
        </div>
    );
};

export default PreOrderCheckout;
