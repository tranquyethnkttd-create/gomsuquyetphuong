import React from 'react';
import { Row, Col, Card, Table, Button, Form, Image } from 'react-bootstrap';

function CartPage({ cart, removeFromCart, updateCartQuantity, setCart, onBackToHome }) {
  // Format price helper
  const formatPrice = (price) => {
    return typeof price === 'number'
      ? price.toLocaleString('vi-VN') + ' đ'
      : price;
  };

  // Calculate totals
  const totalItemPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = totalItemPrice > 2000000 || totalItemPrice === 0 ? 0 : 50000; // Free ship for orders > 2M
  const finalTotal = totalItemPrice + shippingFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert('Cảm ơn bạn đã đặt hàng! Gốm Sứ Quyết Phương sẽ liên hệ lại với bạn qua số điện thoại/zalo để xác nhận đơn hàng sớm nhất.');
    setCart([]);
    onBackToHome();
  };

  return (
    <div className="py-4">
      {/* Breadcrumb / Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div className="d-flex align-items-center gap-2">
          <h3 className="text-danger fw-bold m-0" style={{ letterSpacing: '0.5px' }}>
            🛒 Giỏ Hàng Của Bạn
          </h3>
          <span className="badge bg-danger rounded-pill px-3 py-2 fs-6">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
          </span>
        </div>
        <Button variant="outline-danger" onClick={onBackToHome} className="fw-semibold">
          ← Tiếp tục mua sắm
        </Button>
      </div>

      {cart.length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <div className="display-1 text-muted mb-3">🛒</div>
            <h4 className="fw-bold text-dark">Giỏ hàng của bạn đang trống</h4>
            <p className="text-muted mb-4">Hãy quay lại trang chủ và chọn thêm các tác phẩm gốm sứ tinh xảo của chúng tôi.</p>
            <Button variant="danger" size="lg" className="px-5 fw-bold" onClick={onBackToHome}>
              Mua Sắm Ngay
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {/* List of items */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm overflow-hidden mb-4">
              <Card.Header className="bg-white py-3 border-0">
                <h5 className="mb-0 fw-bold text-dark">Danh sách sản phẩm</h5>
              </Card.Header>
              <div className="table-responsive">
                <Table className="align-middle mb-0 table-hover">
                  <thead className="table-light text-muted uppercase fs-7">
                    <tr>
                      <th className="ps-4">Sản phẩm</th>
                      <th className="text-center">Đơn giá</th>
                      <th className="text-center" style={{ width: '130px' }}>Số lượng</th>
                      <th className="text-end">Số tiền</th>
                      <th className="text-center pe-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <Image
                              src={item.image || 'https://via.placeholder.com/80'}
                              alt={item.name}
                              width={70}
                              height={70}
                              className="rounded object-fit-cover border"
                            />
                            <div>
                              <h6 className="fw-bold mb-1 text-truncate-2" style={{ maxWidth: '250px', fontSize: '0.95rem' }}>
                                {item.name}
                              </h6>
                              {item.category && (
                                <span className="badge bg-light text-secondary border fs-8">
                                  {item.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center fw-semibold text-dark">
                          {formatPrice(item.price)}
                        </td>
                        <td className="text-center">
                          <div className="input-group input-group-sm justify-content-center">
                            <Button
                              variant="outline-secondary"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2"
                            >
                              -
                            </Button>
                            <Form.Control
                              className="text-center bg-white"
                              value={item.quantity}
                              readOnly
                              style={{ maxWidth: '45px', borderLeft: 0, borderRight: 0 }}
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-2"
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-end fw-bold text-danger">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                        <td className="text-center pe-4">
                          <Button
                            variant="link"
                            className="text-muted hover-danger p-0 text-decoration-none"
                            onClick={() => removeFromCart(item.id)}
                            title="Xóa khỏi giỏ hàng"
                          >
                            🗑️ Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>

            {/* Ship Promo Banner */}
            <Card className="border-0 shadow-sm bg-warning-subtle text-warning-emphasis p-3 d-flex flex-row align-items-center gap-3 mb-4">
              <span className="fs-3">🚚</span>
              <div>
                <strong className="d-block">Chương Trình Ưu Đãi Vận Chuyển:</strong>
                <span className="small">Miễn phí vận chuyển toàn quốc cho đơn hàng từ 2.000.000đ trở lên. Đóng gói bọc xốp cẩn thận đảm bảo 100% không bể vỡ!</span>
              </div>
            </Card>
          </Col>

          {/* Cart Summary */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm sticky-top" style={{ top: '100px', zIndex: 10 }}>
              <Card.Header className="bg-white py-3 border-0">
                <h5 className="mb-0 fw-bold text-dark">Tổng toán đơn hàng</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tổng tiền hàng</span>
                  <span className="fw-semibold text-dark">{formatPrice(totalItemPrice)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Phí vận chuyển</span>
                  <span className="fw-semibold text-dark">
                    {shippingFee === 0 ? (
                      <span className="text-success fw-bold">Miễn phí</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold text-dark fs-5">Tổng thanh toán:</span>
                  <span className="fw-bold text-danger fs-4">{formatPrice(finalTotal)}</span>
                </div>

                <Button
                  variant="danger"
                  size="lg"
                  className="w-100 fw-bold py-3 uppercase shadow-sm btn-shopee-pay"
                  style={{ backgroundColor: '#ee4d2d', borderColor: '#ee4d2d' }}
                  onClick={handleCheckout}
                >
                  ĐẶT HÀNG NGAY
                </Button>

                <div className="text-center mt-3">
                  <small className="text-muted d-block">
                    Hỗ trợ nhanh 24/7 qua Hotline/Zalo:
                  </small>
                  <strong className="text-danger">0913 767 574</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default CartPage;
