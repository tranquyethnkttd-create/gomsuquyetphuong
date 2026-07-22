import React from 'react';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';

function CartDrawer({ showCart, setShowCart, cart, removeFromCart, setCart }) {
  return (
    <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
      <Offcanvas.Header closeButton className="bg-danger text-white">
        <Offcanvas.Title>Giỏ hàng của bạn</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        {cart.length === 0 ? (
          <p className="text-muted text-center my-auto">Giỏ hàng trống.</p>
        ) : (
          <>
            <ListGroup variant="flush" className="flex-grow-1">
              {cart.map(item => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-danger">{item.price} x {item.quantity}</small>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>Xóa</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              variant="danger"
              size="lg"
              className="w-100 mt-3"
              onClick={() => {
                alert('Cảm ơn bạn đã đặt hàng! Quyết Phương sẽ liên hệ theo hotline 0835.484.555');
                setCart([]);
                setShowCart(false);
              }}
            >
              Thanh toán ngay
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartDrawer;
