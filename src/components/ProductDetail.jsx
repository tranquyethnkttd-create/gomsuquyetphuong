import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// Nếu bạn có file CSS riêng cho component này, import ở đây
// import './ProductDetail.css'; 

function ProductDetail({ selectedProduct, setSelectedProductId, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Hàm xử lý khi bấm Thêm vào giỏ hàng
  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity); // Giả sử hàm addToCart của bạn nhận tham số quantity
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  return (
    <Container className="my-5 py-3">
      {/* Nút quay lại với tông màu chủ đạo của web */}
      <Button
        variant="outline-secondary"
        size="sm"
        className="mb-4 px-3 fw-semibold"
        onClick={() => setSelectedProductId(null)}
        style={{ borderRadius: '20px', borderColor: '#6c757d', color: '#6c757d' }}
      >
        ← Quay lại danh sách
      </Button>

      {/* Khung chính sản phẩm - Nền trắng sạch sẽ */}
      <div className="bg-white p-4 rounded shadow-sm border">
        <Row className="g-5">
          {/* CỘT TRÁI: Ảnh sản phẩm lớn */}
          <Col md={5}>
            <div
              className="border rounded overflow-hidden mb-3 d-flex align-items-center justify-content-center"
              style={{
                height: '450px',
                backgroundColor: '#f8f9fa', // Màu nền xám nhạt làm nổi bật sản phẩm
                borderColor: '#e0e0e0'
              }}
            >
              <img
                src={selectedProduct.image || 'https://via.placeholder.com/400'}
                alt={selectedProduct.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '15px'
                }}
              />
            </div>
            {/* Phần ảnh phụ (nếu có) - đơn giản, tinh tế */}
            <div className="d-flex gap-2 mt-3 justify-content-center">
              {[selectedProduct.image, selectedProduct.image2, selectedProduct.image3]
                .filter(Boolean)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedProduct.name} - ảnh phụ ${idx + 1}`}
                    className="border rounded cursor-pointer"
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      opacity: idx === 0 ? '1' : '0.7'
                    }}
                  />
                ))
              }
            </div>
          </Col>

          {/* CỘT PHẢI: Thông tin sản phẩm, Giá cả, Mua hàng */}
          <Col md={7}>
            {/* Danh mục */}
            <div className="text-uppercase text-secondary mb-2" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
              {selectedProduct.category || 'Đồ Gốm'}
            </div>

            {/* Tên sản phẩm - Font chữ sang trọng, cứng cáp */}
            <h1 className="fw-bold text-dark fs-3 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              {selectedProduct.name}
            </h1>

            {/* Mô tả ngắn - Đơn giản, không có report hay đánh giá ảo */}
            <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              {selectedProduct.description || 'Sản phẩm gốm sứ cao cấp, chế tác thủ công tinh xảo, phù hợp cho không gian thờ cúng và phong thủy.'}
            </p>

            {/* Giá tiền - Nổi bật, tông màu Đỏ truyền thống */}
            <div
              className="p-3 rounded mb-4"
              style={{
                backgroundColor: '#fff3cd', // Màu vàng nhạt làm nền giá
                borderLeft: '5px solid #dc3545' // Viền đỏ cảnh báo
              }}
            >
              <span className="text-danger fw-bold fs-2 lh-1">
                {selectedProduct.price ? selectedProduct.price.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
              </span>
            </div>

            {/* Chọn số lượng */}
            <div className="mb-4 d-flex align-items-center gap-3">
              <label className="fw-semibold text-secondary m-0">Số lượng:</label>
              <div className="input-group" style={{ width: '140px' }}>
                <Button
                  variant="outline-secondary"
                  onClick={handleDecrease}
                  className="fw-bold"
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  value={quantity}
                  readOnly
                  className="text-center bg-white fw-bold fs-5"
                  style={{ borderColor: '#ced4da' }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleIncrease}
                  className="fw-bold"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Nút hành động - Tông màu Đỏ/Nâu chủ đạo, bo góc nhẹ */}
            <div className="d-flex gap-3 mt-5">
              <Button
                variant="outline-danger"
                className="flex-grow-1 py-3 fw-bold text-uppercase"
                onClick={handleAddToCart}
                style={{
                  borderRadius: '4px',
                  borderWidth: '2px',
                  letterSpacing: '0.5px'
                }}
              >
                🛒 Thêm vào giỏ
              </Button>
              <Button
                variant="danger"
                className="flex-grow-1 py-3 fw-bold text-uppercase"
                style={{
                  backgroundColor: '#dc3545', // Màu đỏ thương hiệu
                  borderColor: '#dc3545',
                  borderRadius: '4px',
                  letterSpacing: '0.5px'
                }}
                onClick={() => alert('Chức năng mua ngay đang được hoàn thiện!')}
              >
                Mua ngay
              </Button>
            </div>

            {/* Thông tin hỗ trợ nhỏ bên dưới */}
            <div className="mt-4 text-muted small fst-italic text-center">
              Hotline tư vấn: 0913 767 574 - Miễn phí vận chuyển khu vực Ninh Bình.
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ProductDetail;