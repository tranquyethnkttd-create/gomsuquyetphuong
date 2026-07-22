import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="text-white mt-auto pt-4 pb-2" style={{ backgroundColor: '#3b0d0c' }}>
      <Container>
        <Row className="g-4">
          <Col md={5}>
            <h5 className="text-warning fw-bold">GỐM SỨ QUYẾT PHƯƠNG</h5>
            <p className="small text-light">
              Chuyên cung cấp đồ thờ cúng, gốm sứ phong thủy, gốm sứ tâm linh cao cấp chuẩn truyền thống.
            </p>
          </Col>
          <Col md={4}>
            <h5 className="text-warning fw-bold">THÔNG TIN LIÊN HỆ</h5>
            <p className="small mb-1">📍 <strong>Địa chỉ:</strong> Số nhà 273, tổ 9, phường Trung Sơn, tỉnh Ninh Bình</p>
            <p className="small mb-1">📞 <strong>Hotline/Zalo:</strong> 84+ 913767574</p>
            <p className="small mb-1">✉️ <strong>Email:</strong> gomsuquyetphuong@gmail.com</p>
          </Col>
          <Col md={3}>
            <h5 className="text-warning fw-bold">DANH MỤC</h5>
            <ul className="list-unstyled small text-light">
              <li>Đồ Thờ Cúng Men Rạn</li>
              <li>Lộc Bình Phong Thủy</li>
              <li>Bộ Ấm Trà Tử Sa</li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary my-3" />
        <p className="text-center small text-secondary mb-0">
          &copy; 2026 Gốm Sứ Quyết Phương. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
