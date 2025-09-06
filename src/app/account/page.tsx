"use client";

import { GET_CUSTOMER_ORDERS } from "@/graphql/queries";
import client from "@/lib/apollo";
import { useQuery } from "@apollo/client/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Order {
  id: string;
  orderNumber: number;
  date: string;
  total: string;
  status: string;
}

const OrderHistory = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDERS);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  const orders = (data as { customer?: { orders?: { nodes?: Order[] } } })
    ?.customer?.orders?.nodes;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="w-full bg-gray-100 text-left">
                <th className="p-4 font-semibold">Order #</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4">{order.orderNumber}</td>
                  <td className="p-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You have no previous orders.</p>
      )}
    </div>
  );
};

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth-token");
    if (!token) {
      router.push("/account/login");
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("auth-token");
    // Also clear the Apollo cache on logout
    client.resetStore();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Logout
          </button>
        </div>
        <p className="text-lg mb-8">
          Welcome! Here you can view your recent orders.
        </p>

        <OrderHistory />
      </div>
    </div>
  );
}
