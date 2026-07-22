import React from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';

function ProductDetail({ selectedProduct, setSelectedProductId, addToCart }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <Button variant="outline-danger" className="mb-3" onClick={() => setSelectedProductId(null)}>
        ← Quay lại danh sách
      </Button>
      <Row>
        <Col md={6}>
          <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid rounded shadow-sm w-100" />
        </Col>
        <Col md={6}>
          <Badge bg="secondary" className="mb-2">{selectedProduct.category}</Badge>
          <h2 className="text-danger fw-bold">{selectedProduct.name}</h2>
          <h3 className="text-danger fw-bold my-3">{selectedProduct.price}</h3>
          <p><strong>Xuất xứ:</strong> {selectedProduct.origin || "Bát Tràng, Hà Nội"}</p>
          <hr />
          <h5>Mô tả sản phẩm:</h5>
          <p>{selectedProduct.description || "Chưa có mô tả chi tiết."}</p>
          <Button variant="danger" size="lg" className="w-100 mt-3" onClick={() => addToCart(selectedProduct)}>
            Thêm Vào Giỏ Hàng
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
