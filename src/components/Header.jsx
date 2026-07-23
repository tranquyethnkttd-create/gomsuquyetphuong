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
            {/* Biểu tượng Bình Gốm Phong Thủy thuần SVG */}
            <svg
              width="42"
              height="42"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
            >
              {/* Vòng tròn viền vàng */}
              <circle cx="32" cy="32" r="30" fill="#8B0000" stroke="#FFD700" strokeWidth="2" />
              {/* Miệng bình gốm */}
              <ellipse cx="32" cy="18" rx="8" ry="3" fill="#FFD700" />
              {/* Cổ bình */}
              <path d="M25 19 L26 25 L38 25 L39 19 Z" fill="#FFD700" />
              {/* Thân bình tài lộc */}
              <path d="M26 25 C18 30 16 42 22 48 C26 52 38 52 42 48 C48 42 46 30 38 25 Z" fill="#FFD700" />
              {/* Họa tiết đai bình */}
              <path d="M20 36 Q32 40 44 36" stroke="#8B0000" strokeWidth="2" fill="none" />
              {/* Chân đế */}
              <rect x="26" y="49" width="12" height="3" rx="1" fill="#DAA520" />
            </svg>

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
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            Bộ đồ ăn / Bộ thờ
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            Chén, Chén chấm
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            Lộc bình, Bát hương
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Đồ thờ cúng'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            Mâm bồng, Kỷ nước
                          </button>
                        </li>
                      </ul>
                    </Col>

                    <Col md={3}>
                      <h6 className="text-danger fw-bold border-bottom pb-2 mb-3">GỐM SỨ GIA DỤNG & PHONG THỦY</h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Chum rượu'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            🍶 Chum Rượu Bát Tràng
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Chĩnh gạo'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            🌾 Chĩnh Gạo Tài Lộc
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Chậu cảnh'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            🪴 Chậu Cảnh Nghệ Thuật
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { setSelectedCategory('Đồ phong thủy'); setShowMegaMenu(false); if (setIsUserPage) setIsUserPage(false); }}
                          >
                            Tượng Linh Vật & Bình Hoa
                          </button>
                        </li>
                      </ul>
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