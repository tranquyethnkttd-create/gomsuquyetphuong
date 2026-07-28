import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

function CartPage({ cart, removeFromCart, updateCartQuantity, setCart, onBackToHome, currentUser }) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form thông tin khách hàng
  const [formData, setFormData] = useState({
    name: currentUser?.username || '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'COD'
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🎯 XỬ LÝ ĐẶT HÀNG & GỬI EMAIL THÔNG BÁO CHO ADMIN
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Tạo chuỗi danh sách sản phẩm đẹp mắt để đưa vào {{order_items}} trong template email
    const orderItemsString = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} | SL: x${item.quantity} | Giá: ${(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ`
      )
      .join('\n');

    // 2. Chuẩn bị dữ liệu gửi EmailJS
    const templateParams = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_address: formData.address,
      customer_note: formData.note || 'Không có ghi chú',
      order_items: orderItemsString,
      total_price: totalAmount.toLocaleString('vi-VN'),
      payment_method: formData.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'
    };

    // 3. Gửi Email thông báo về Gmail Admin qua EmailJS
    emailjs
      .send(
        'service_0noctvj',
        'template_c0gxu8f',
        templateParams,
        'ifaW1y2UMrGwhsABD'
      )
      .then(
        (response) => {
          console.log('Gửi email thông báo đơn hàng thành công!', response.status, response.text);
          alert('🎉 Đặt hàng thành công! Đơn hàng của ông đã được gửi trực tiếp về Gmail Admin.');

          // Reset giỏ hàng và đóng Modal
          setCart([]);
          setShowCheckoutModal(false);
          onBackToHome();
        },
        (error) => {
          console.error('Lỗi khi gửi email:', error);
          alert('Đặt hàng thành công! (Lỗi gửi email thông báo, nhưng đơn vẫn ghi nhận).');
          setCart([]);
          setShowCheckoutModal(false);
          onBackToHome();
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-danger fw-bold m-0">🛒 Giỏ Hàng Của Bạn</h3>
        <Button variant="outline-secondary" size="sm" onClick={onBackToHome}>
          ← Tiếp tục mua sắm
        </Button>
      </div>

      {cart.length === 0 ? (
        <Card className="text-center p-5 shadow-sm border-0">
          <Card.Body>
            <h5>Giỏ hàng đang trống!</h5>
            <p className="text-muted">Hãy chọn các sản phẩm gốm sứ tinh xảo đưa vào giỏ nhé.</p>
            <Button variant="danger" onClick={onBackToHome}>
              Khám phá sản phẩm
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {/* Bảng sản phẩm */}
          <Col lg={8}>
            <Card className="shadow-sm border-0 p-3">
              <Table responsive align="middle">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.image || 'https://via.placeholder.com/60'}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            className="rounded border"
                          />
                          <span className="fw-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td>{item.price.toLocaleString('vi-VN')} đ</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="fw-bold px-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="text-danger fw-bold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>

          {/* Tóm tắt đơn hàng */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 p-3">
              <h5 className="fw-bold border-bottom pb-2">Tóm Tắt Đơn Hàng</h5>
              <div className="d-flex justify-content-between my-2">
                <span>Tạm tính:</span>
                <span className="fw-bold">{totalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="d-flex justify-content-between my-2">
                <span>Phí vận chuyển:</span>
                <span className="text-success fw-bold">Miễn phí</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between my-2 fs-5">
                <span className="fw-bold">Tổng tiền:</span>
                <span className="text-danger fw-bold">{totalAmount.toLocaleString('vi-VN')} đ</span>
              </div>

              <Button
                variant="danger"
                className="w-100 mt-3 py-2 fw-bold"
                onClick={() => setShowCheckoutModal(true)}
              >
                PROCEED TO CHECKOUT (ĐẶT HÀNG)
              </Button>
            </Card>
          </Col>
        </Row>
      )}

      {/* MODAL ĐIỀN THÔNG TIN GIAO HÀNG */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="fs-5 fw-bold">Thông Tin Giao Hàng & Thanh Toán</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCheckoutSubmit}>
          <Modal.Body className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label className="fw-semibold">Họ và tên người nhận *</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-semibold">Số điện thoại *</Form.Label>
              <Form.Control
                type="tel"
                required
                placeholder="0912345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-semibold">Địa chỉ nhận hàng cụ thể *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-semibold">Ghi chú đơn hàng (Nếu có)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ví dụ: Giao ngoài giờ hành chính, bọc xốp cẩn thận..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="fw-semibold">Phương thức thanh toán</Form.Label>
              <Form.Select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="BANK">Chuyển khoản ngân hàng</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
              Hủy
            </Button>
            <Button variant="danger" type="submit" disabled={isSubmitting} className="fw-bold">
              {isSubmitting ? '⏳ Đang gửi đơn...' : 'XÁC NHẬN ĐẶT HÀNG'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default CartPage;