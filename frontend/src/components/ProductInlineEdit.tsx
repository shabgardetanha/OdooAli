// frontend/src/components/ProductInlineEdit.tsx
import React, { useState } from 'react';
import { Product } from '../types';
import { useUserRole } from '../hooks/useUserRole';

interface Props {
  product: Product;
  onChange?: (updatedProduct: Product) => void;
}

const ProductInlineEdit: React.FC<Props> = ({ product, onChange }) => {
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<number>(product.price);
  const role = useUserRole();
  const canEdit = role === 'Admin' || role === 'Manager';

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onChange && onChange({ ...product, name: newName });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value) || 0;
    setPrice(newPrice);
    onChange && onChange({ ...product, price: newPrice });
  };

  return (
    <div className="flex items-center gap-2">
      <span>{product.name}: </span>
      {canEdit ? (
        <input type="text" value={name} onChange={handleNameChange} className="border p-1 rounded w-32" />
      ) : (
        <span>{name}</span>
      )}
      <span>Price: </span>
      {canEdit ? (
        <input type="number" value={price} onChange={handlePriceChange} className="border p-1 rounded w-20" />
      ) : (
        <span>{price}</span>
      )}
    </div>
  );
};

export default ProductInlineEdit;
