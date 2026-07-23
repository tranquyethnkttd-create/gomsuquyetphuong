import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function ProductCard({ product, setSelectedProductId, addToCart, cart = [] }) {
  // 🎯 Tìm xem sản phẩm này đã có trong giỏ hàng chưa và lấy số lượng
  const cartItem = cart.find(item => item.id === product.id);
  const itemQuantity = cartItem ? cartItem.quantity : 0;

  // Định dạng giá tiền VNĐ cho đẹp
  const formattedPrice = typeof product.price === 'number'
    ? product.price.toLocaleString('vi-VN') + ' đ'
    : product.price;

  return (
    <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden product-card">
      {/* Khung ảnh sản phẩm */}
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          style={{ height: '220px', objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => setSelectedProductId(product.id)}
        />

        {/* Danh mục góc trên bên trái */}
        {product.category && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2 px-2 py-1 fs-7">
            {product.category}
          </Badge>
        )}

        {/* 🎯 SỐ LƯỢNG MÓN Ở GÓC DƯỚI BÊN PHẢI CỦA ẢNH */}
        {itemQuantity > 0 && (
          <Badge
            bg="warning"
            text="dark"
            className="position-absolute bottom-0 end-0 m-2 px-2 py-1 fw-bold shadow-sm d-flex align-items-center gap-1 border border-white"
            style={{ fontSize: '0.85rem', zIndex: 2 }}
          >
            🛒 x{itemQuantity}
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div>
          <Card.Title
            className="fw-bold fs-6 text-truncate-2 cursor-pointer mb-2"
            style={{ cursor: 'pointer', height: '2.8em', overflow: 'hidden' }}
            onClick={() => setSelectedProductId(product.id)}
          >
            {product.name}
          </Card.Title>

          <Card.Text className="text-danger fw-bold fs-5 mb-3">
            {formattedPrice}
          </Card.Text>
        </div>

        {/* Các nút bấm */}
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            className="w-50 fw-semibold"
            onClick={() => setSelectedProductId(product.id)}
          >
            Chi tiết
          </Button>

          <Button
            variant="danger"
            size="sm"
            className="w-50 fw-semibold position-relative"
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