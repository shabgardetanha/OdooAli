// frontend/src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import ProductTree from './TreeView/ProductTree';
import { Product } from '../types';
import { api } from '../services/api';
import { useUserRole } from '../hooks/useUserRole';
import { subscribeToProductUpdates } from '../services/websocket';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const role = useUserRole();

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>('/products/');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const unsubscribe = subscribeToProductUpdates((updatedProduct: Product) => {
      setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    });

    return () => unsubscribe();
  }, []);

  const handleProductChange = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    api.put(`/products/${updatedProduct.id}/`, updatedProduct).catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products Dashboard</h2>
      <ProductTree
        products={products}
        onProductChange={role === 'Admin' || role === 'Manager' ? handleProductChange : undefined}
        role={role}
      />
    </div>
  );
};

export default Dashboard;
