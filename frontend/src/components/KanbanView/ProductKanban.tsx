import React from "react"

interface Product {
  id: number
  name: string
  price: number
  description?: string
  imageUrl?: string
}

interface ProductKanbanProps {
  products: Product[]
  onSelect?: (product: Product) => void
}

const ProductKanban: React.FC<ProductKanbanProps> = ({ products, onSelect }) => {
  return (
    <div className="kanban-container">
      {products.map((product) => (
        <div
          key={product.id}
          className="kanban-card"
          onClick={() => onSelect?.(product)}
        >
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="kanban-card-image"
            />
          )}
          <h3>{product.name}</h3>
          <p>{product.price} $</p>
          {product.description && <p>{product.description}</p>}
        </div>
      ))}
    </div>
  )
}

export default ProductKanban
