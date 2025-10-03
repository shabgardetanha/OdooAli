import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../store/salesSlice";
import { Card, Col, Row } from "antd";
import { RootState, AppDispatch } from "../../store"; // تایپ‌های ریداکس

interface Product {
  id: number;
  name: string;
}

interface Sale {
  id: number;
  product: Product;
  quantity: number;
  status: "pending" | "approved" | "shipped";
}

const statuses: Sale["status"][] = ["pending", "approved", "shipped"];

const SalesKanban: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sales = useSelector((state: RootState) => state.sales.items as Sale[]);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <Row gutter={16}>
      {statuses.map((status) => (
        <Col key={status}>
          <Card title={status.toUpperCase()} style={{ width: 300 }}>
            {sales
              .filter((s) => s.status === status)
              .map((order) => (
                <div key={order.id}>
                  {order.product.name} - {order.quantity}
                </div>
              ))}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SalesKanban;
