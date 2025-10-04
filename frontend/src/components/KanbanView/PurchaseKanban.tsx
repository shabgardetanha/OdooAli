import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseOrders, updatePurchaseOrder, PurchaseOrder } from "../../store/purchaseSlice";
import usePurchaseWS from "../../hooks/usePurchaseWS";
import { Card, Col, Row, Input, Button } from "antd";
import { RootState } from "../../store";

export default function PurchaseKanban() {
  const dispatch = useDispatch();
  const purchaseOrders = useSelector((state: RootState) => state.purchase.items);

  usePurchaseWS();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [quantityValue, setQuantityValue] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);

  const statuses: PurchaseOrder["status"][] = ["pending", "approved", "shipped"];

  const handleEdit = (order: PurchaseOrder) => {
    setEditingId(order.id);
    setQuantityValue(order.quantity);
  };

  const handleSave = (order: PurchaseOrder) => {
    // فقط Role مجاز می‌تواند تغییر دهد
    // در اینجا فرض می‌کنیم Role validation در Backend انجام می‌شود
    const updated: PurchaseOrder = { ...order, quantity: quantityValue };
    dispatch(updatePurchaseOrder(updated));

    // ارسال به Backend
    fetch(`/api/purchase_orders/${order.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: quantityValue }),
    });

    setEditingId(null);
  };

  return (
    <Row gutter={16}>
      {statuses.map((status) => (
        <Col key={status}>
          <Card title={status.toUpperCase()} style={{ width: 300 }}>
            {purchaseOrders
              .filter((p) => p.status === status)
              .map((order) => (
                <div key={order.id} style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
                  {editingId === order.id ? (
                    <>
                      <Input
                        type="number"
                        value={quantityValue}
                        onChange={(e) => setQuantityValue(Number(e.target.value))}
                        style={{ width: 80, marginRight: 8 }}
                      />
                      <Button onClick={() => handleSave(order)} type="primary" size="small">
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <span style={{ flex: 1 }}>
                        {order.product_name} - {order.quantity}
                      </span>
                      <Button onClick={() => handleEdit(order)} size="small">
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              ))}
          </Card>
        </Col>
