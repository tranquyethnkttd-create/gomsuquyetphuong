import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function ProductCard({ product, setSelectedProductId, addToCart }) {
  return (
    <Card className="h-100 shadow-sm border-0 position-relative">
      {product.category && (
        <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
          {product.category}
        </Badge>
      )}
      <Card.Img
        variant="top"
        src={product.image || 'https://via.placeholder.com/300x200?text=G%20om+Su'}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 fw-bold text-dark">{product.name}</Card.Title>
        <Card.Text className="text-danger fw-bold fs-5 my-2">{product.price}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            className="w-50"
            onClick={() => setSelectedProductId(product.id)}
          >
            Chi tiết
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="w-50"
            onClick={() => addToCart(product)}
          >
            Thêm giỏ
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
