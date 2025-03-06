/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

interface Order {
    id: string;
    products: { name: string; price: number; quantity: number; totalPrice: number }[];
    totalAmount: number;
    paymentMethod: string;
    timestamp: any;
}

const OrderHistory = () => {
    const  user  = useAppSelector(useSelectCurrentUser);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "orderHistory"), where("userID", "==", user.id));
                const querySnapshot = await getDocs(q);
                const userOrders: Order[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Order[];

                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching order history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) return <p className="text-center text-lg">Please log in to view your order history.</p>;

    if (loading) return <p className="text-center text-lg">Loading order history...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order History</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Timestamp</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id} className="hover:bg-gray-100">
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.paymentMethod}</TableCell>
                            <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>{order.timestamp?.toDate().toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <h2 className="text-xl font-semibold mt-6">Order Details</h2>
            {orders.map(order => (
                <div key={order.id} className="border p-4 rounded-lg mt-4">
                    <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                    <ul className="mt-2">
                        {order.products.map((product, index) => (
                            <li key={index} className="flex justify-between border-b py-2">
                                <span>{product.name} (x{product.quantity})</span>
                                <span>${product.totalPrice.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
