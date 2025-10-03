// frontend/src/components/ProductTree.tsx
import React from 'react';
import { Product } from '../types';
import ProductInlineEdit from '../ProductInlineEdit';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Props {
  products: Product[];
  role: string;
  onProductChange?: (product: Product) => void;
}

const ProductTree: React.FC<Props> = ({ products, role, onProductChange }) => {
  const canEdit = role === 'Admin' || role === 'Manager';

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !canEdit) return;
    const reordered = Array.from(products);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    reordered.forEach(p => onProductChange && onProductChange(p));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="productTree">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
            {products.map((product, index) => (
              <Draggable key={product.id} draggableId={product.id.toString()} index={index} isDragDisabled={!canEdit}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 border rounded flex items-center justify-between bg-white"
                  >
                    <ProductInlineEdit
                      product={product}
                      onChange={canEdit ? onProductChange : undefined}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductTree;
