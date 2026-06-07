"use client";

import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("فشل تحديث الحالة");
      }

      await loadOrders();
    } catch (error) {
      console.error("Update status error:", error);
      alert("حدث خطأ أثناء تحديث حالة الطلب");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">عرض الطلبات المحفوظة مع صورة الإيصال</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-600">جاري تحميل الطلبات...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-600">لا توجد طلبات محفوظة حتى الآن.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article key={order._id} className="rounded-xl border bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm text-gray-500">#{order._id.slice(-6)}</p>
                        <h2 className="text-lg font-semibold text-gray-900">{order.customerName}</h2>
                        <p className="text-sm text-gray-600">رقم الهاتف: {order.phone || "لا يوجد رقم"}</p>
                        <p className="text-sm text-gray-600">العنوان: {order.address || order.customerAddress || "لا يوجد عنوان"}</p>
                        <p className="text-sm text-gray-600">طريقة الدفع: {order.paymentMethod}</p>
                        <p className="text-sm text-gray-600">الإجمالي: {order.totalAmount} ج.م</p>
                        <p className="text-sm text-gray-600">الحالة: {order.status}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => updateStatus(order._id, "confirmed")}
                            disabled={updatingId === order._id}
                            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            تأكيد الطلب
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(order._id, "cancelled")}
                            disabled={updatingId === order._id}
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            إلغاء الطلب
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(order._id, "pending")}
                            disabled={updatingId === order._id}
                            className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                          >
                            إعادة إلى Pending
                          </button>
                        </div>
                      </div>

                      {order.receiptImage ? (
                        <img
                          src={order.receiptImage}
                          alt="إيصال الطلب"
                          className="h-40 w-full rounded-lg border object-cover md:w-56"
                        />
                      ) : (
                        <div className="flex h-40 w-full items-center justify-center rounded-lg border bg-gray-50 text-sm text-gray-500 md:w-56">
                          لا يوجد إيصال
                        </div>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-semibold text-gray-800">العناصر:</p>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {order.items?.map((item) => (
                          <li key={`${order._id}-${item._id || item.name}`} className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name || item.nameAr || item.nameEn}
                                className="h-16 w-16 rounded-lg object-cover border bg-white"
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-lg border bg-white flex items-center justify-center text-[10px] text-gray-400">No image</div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900">{item.name || item.nameAr || item.nameEn}</p>
                              <p className="text-gray-600">الكمية: {item.quantity} × {item.price} ج.م</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
