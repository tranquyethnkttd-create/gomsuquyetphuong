import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, Button, InputGroup, Badge, Dropdown } from 'react-bootstrap';

function Header({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  setSelectedProductId,
  totalCartCount,
  setShowCart,
  currentUser,
  onOpenAuth,
  onLogout,
  setIsAdminView,
  setIsUserPage
}) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // Hàm quay về Trang chủ hiển thị tất cả sản phẩm
  const handleGoHome = () => {
    setSelectedProductId(null);
    setIsAdminView(false);
    if (setIsUserPage) setIsUserPage(false);
    setSelectedCategory('Tất cả');
    setSearchQuery('');
  };

  const handleOpenUserPage = () => {
    setIsAdminView(false);
    setSelectedProductId(null);
    if (setIsUserPage) setIsUserPage(true);
  };

  return (
    <header className="sticky-top shadow-sm bg-white">
      {/* 1. Top Bar */}
      <div className="bg-dark text-warning py-1 px-3 small d-none d-md-flex justify-content-between align-items-center">
        <span>✨ Tinh Hoa Gốm Sứ Việt - Đẳng Cấp & Tâm Linh</span>
        <span>Hotline/Zalo: <strong>0913 767 574</strong></span>
      </div>

      {/* 2. Main Navigation Bar */}
      <Navbar style={{ backgroundColor: '#5e2828ff' }} expand="lg" className="py-3 border-bottom position-relative">
        <Container>
          
          {/* LOGO VÀ TÊN THƯƠNG HIỆU */}
          <Navbar.Brand 
            href="#" 
            onClick={handleGoHome} 
            className="fw-bold text-white fs-4 d-flex align-items-center gap-2 text-decoration-none"
          >
            {/* Thẻ ảnh Logo ở đây - Bạn thay link ảnh/path '/logo.png' thực tế vào src nhé */}
            <img 
              src="/logo.png" 
              alt="Gốm Sứ Quyết Phương" 
              style={{ width: '45px', height: '45px', objectFit: 'contain' }}
              onError={(e) => {
                // Fallback icon nếu đường dẫn ảnh bị lỗi
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="d-block leading-tight">GỐM SỨ QUYẾT PHƯƠNG</span>
              <span className="d-block text-warning fw-semibold" style={{ fontSize: '11px', letterSpacing: '1px', marginTop: '-2px' }}>
                ĐỒ THỜ - ĐỒ PHONG THỦY - GỐM SỨ TÂM LINH
              </span>
            </div>
          </Navbar.Brand>

          {/* Search Bar */}
          <div className="mx-auto d-none d-lg-block" style={{ width: '350px' }}>
            <InputGroup>
              <Form.Control
                placeholder="Tìm kiếm đồ thờ, lộc bình..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="warning" className="text-white fw-bold">🔍</Button>
            </InputGroup>
          </div>

          {/* Giỏ hàng & Đăng nhập / Tài khoản */}
          <Nav className="ms-auto align-items-center gap-3">
            <Button variant="outline-light" className="position-relative" onClick={() => setShowCart(true)}>
              🛒 Giỏ hàng
              {totalCartCount > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                  {totalCartCount}
                </Badge>
              )}
            </Button>

            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-user"
                  onClick={handleOpenUserPage}
                  className="text-white text-decoration-none fw-semibold d-flex align-items-center gap-2 p-0 border-0"
                >
                  <span className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px' }}>
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span>Chào, {currentUser.username || currentUser.email}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 py-2 mt-2" style={{ minWidth: '230px' }}>
                  <div className="px-3 py-2 mb-1 border-bottom bg-light cursor-pointer" onClick={handleOpenUserPage}>
                    <p className="mb-0 small text-muted">Tài khoản của bạn</p>
                    <p className="mb-0 fw-bold text-truncate text-dark" style={{ maxWidth: '190px' }}>
                      {currentUser.email || currentUser.username}
                    </p>
                  </div>

                  <Dropdown.Item onClick={handleOpenUserPage} className="py-2">
                    👤 Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleOpenUserPage} className="py-2">
                    📦 Đơn mua của tôi
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleOpenUserPage} className="py-2">
                    📍 Sổ địa chỉ giao hàng
                  </Dropdown.Item>

                  {currentUser.role === 'admin' && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => { setIsAdminView(true); if (setIsUserPage) setIsUserPage(false); }} className="py-2 text-danger fw-bold">
                        ⚙️ Trang Quản Trị (Admin)
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout} className="py-2 text-danger">
                    🚪 Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="warning" size="sm" className="fw-bold" onClick={onOpenAuth}>
                Đăng nhập
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* 3. Sub Navigation Bar */}
      <div className="bg-white border-bottom shadow-sm">
        <Container className="position-relative">
          <Nav className="gap-4 align-items-center justify-content-center justify-content-lg-start">
            
            <Nav.Link href="#" onClick={handleGoHome} className="fw-bold text-dark py-3">
              Trang chủ
            </Nav.Link>

            {/* SẢN PHẨM & MEGA MENU */}
            <div
              className="d-flex align-items-center"
              style={{ padding: '12px 0' }}
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <span className="fw-bold text-danger cursor-pointer py-1" style={{ cursor: 'pointer' }}>
                SẢN PHẨM ▾
              </span>

              {showMegaMenu && (
                <div
                  className="position-absolute start-0 w-100 bg-white shadow-lg p-4 border rounded-bottom animate-fade-in"
                  style={{ top: '100%', zIndex: 1050, borderTop: '3px solid #dc3545', marginTop: '0px' }}
                >
                  <Row>
                    <Col md={3}>
                      <h6 className="text-danger fw-bold border-bottom pb-2 mb-3">ĐỒ THỜ CÚNG</h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>Bộ đồ ăn / Bộ thờ</a></li>
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>Chén, Chén chấm</a></li>
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>Lộc bình, Bát hương</a></li>
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>Mâm bồng, Kỷ nước</a></li>
                      </ul>
                    </Col>

                    <Col md={3}>
                      <h6 className="text-danger fw-bold border-bottom pb-2 mb-3">GỐM SỨ GIA DỤNG & PHONG THỦY</h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Chum rượu'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>🍶 Chum Rượu Bát Tràng</a></li>
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Chĩnh gạo'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>🌾 Chĩnh Gạo Tài Lộc</a></li>
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Chậu cảnh'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>🪴 Chậu Cảnh Nghệ Thuật</a></li>
                        <li><a href="#" className="text-dark text-decoration-none" onClick={() => { setSelectedCategory('Đồ phong thủy'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}>Tượng Linh Vật & Bình Hoa</a></li>
                      </ul>
                    </Col>

                    <Col md={6} className="d-flex gap-3 justify-content-end">
                      <div className="border rounded overflow-hidden position-relative" style={{ width: '48%', height: '150px' }}>
                        <img
                          src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400"
                          alt="New Arrivals"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-1 text-center small fw-bold">
                          Sản Phẩm Mới Nhất
                        </div>
                      </div>
                      <div className="border rounded overflow-hidden position-relative" style={{ width: '48%', height: '150px' }}>
                        <img
                          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400"
                          alt="Hot Items"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-1 text-center small fw-bold">
                          Đồ Thờ Bát Tràng
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </div>

            <Nav.Link href="#" onClick={() => { setSelectedCategory('Đồ thờ cúng'); if (setIsUserPage) setIsUserPage(false); }} className="text-dark py-3">Đồ Thờ Cúng</Nav.Link>
            <Nav.Link href="#" onClick={() => { setSelectedCategory('Đồ phong thủy'); if (setIsUserPage) setIsUserPage(false); }} className="text-dark py-3">Đồ Phong Thủy</Nav.Link>
            <Nav.Link href="#" onClick={() => { setSelectedCategory('Gốm sứ tâm linh'); if (setIsUserPage) setIsUserPage(false); }} className="text-dark py-3">Tâm Linh</Nav.Link>
          </Nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;