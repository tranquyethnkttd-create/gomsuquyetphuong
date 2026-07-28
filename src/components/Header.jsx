import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, Button, InputGroup, Badge, Dropdown } from 'react-bootstrap';

function Header({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  setSelectedProductId,
  totalCartCount,
  setShowCart,
  setIsCartPage,
  currentUser,
  onOpenAuth,
  onLogout,
  setIsAdminView,
  setIsUserPage
}) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // Helper reset các view phụ (Giỏ hàng, Chi tiết SP)
  const resetSubViews = () => {
    setSelectedProductId(null);
    if (setIsCartPage) setIsCartPage(false);
  };

  // 🏠 Quay về Trang chủ
  const handleGoHome = () => {
    resetSubViews();
    setIsAdminView(false);
    if (setIsUserPage) setIsUserPage(false);
    setSelectedCategory('Tất cả');
    setSearchQuery('');
  };

  // 👤 Mở trang thông tin User
  const handleOpenUserPage = () => {
    resetSubViews();
    setIsAdminView(false);
    if (setIsUserPage) setIsUserPage(true);
  };

  // ⚙️ Mở trang Admin
  const handleOpenAdminView = () => {
    resetSubViews();
    if (setIsUserPage) setIsUserPage(false);
    setIsAdminView(true);
  };

  // 🏷️ Chuyển Danh Mục
  const handleSelectCategory = (catName) => {
    resetSubViews();
    if (setIsUserPage) setIsUserPage(false);
    setIsAdminView(false);
    setSelectedCategory(catName);
  };

  return (
    <header className="sticky-top shadow-sm bg-white">
      {/* 1. Top Bar */}
      <div className="bg-dark text-warning py-1 px-3 small d-none d-md-flex justify-content-between align-items-center">
        <span>✨ Tinh Hoa Gốm Sứ Việt - Đẳng Cấp & Tâm Linh</span>
        <span>Hotline/Zalo: <strong>0913 767 574</strong></span>
      </div>

      {/* 2. Main Navigation Bar */}
      <Navbar style={{ backgroundColor: '#5e2828' }} expand="lg" className="py-3 border-bottom position-relative">
        <Container>

          {/* LOGO VÀ TÊN THƯƠNG HIỆU */}
          <Navbar.Brand
            as="div"
            onClick={handleGoHome}
            style={{ cursor: 'pointer' }}
            className="fw-bold text-white fs-4 d-flex align-items-center gap-2 text-decoration-none"
          >
            {/* SVG LOGO */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.4))' }}
            >
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4A1010" />
                  <stop offset="100%" stopColor="#250505" />
                </radialGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="50%" stopColor="#FFB300" />
                  <stop offset="100%" stopColor="#FF8F00" />
                </linearGradient>
              </defs>

              <circle cx="100" cy="100" r="96" fill="url(#bgGrad)" />
              <circle cx="100" cy="100" r="92" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
              <circle cx="100" cy="100" r="82" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
              <circle cx="100" cy="100" r="76" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="4 3" />

              <path d="M 100 45 C 80 70 85 105 100 112 C 115 105 120 70 100 45 Z" fill="url(#goldGrad)" />
              <path d="M 100 112 C 70 100 55 65 72 56 C 88 50 96 80 100 112 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 100 112 C 130 100 145 65 128 56 C 112 50 104 80 100 112 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 76 116 Q 100 132 124 116 Q 100 126 76 116 Z" fill="url(#goldGrad)" />

              <text x="100" y="148" textAnchor="middle" fill="url(#goldGrad)" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="1">
                QUYẾT PHƯƠNG
              </text>
              <text x="100" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="1.5">
                GỐM SỨ BÁT TRÀNG
              </text>
              <circle cx="100" cy="177" r="2.5" fill="url(#goldGrad)" />
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
            <Button
              variant="outline-light"
              className="position-relative d-flex align-items-center gap-2"
              onClick={() => {
                if (setShowCart) setShowCart(true);
                else if (setIsCartPage) setIsCartPage(true);
              }}
            >
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
                  className="text-white text-decoration-none fw-semibold d-flex align-items-center gap-2 p-0 border-0"
                >
                  <span className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px' }}>
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span>Chào, {currentUser.username || currentUser.email}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 py-2 mt-2" style={{ minWidth: '230px' }}>
                  <div className="px-3 py-2 mb-1 border-bottom bg-light" onClick={handleOpenUserPage} style={{ cursor: 'pointer' }}>
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

                  {/* CHỈ HIỂN THỊ ITEM ADMIN KHI ROLE LÀ ADMIN */}
                  {currentUser.role === 'admin' && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleOpenAdminView} className="py-2 text-danger fw-bold">
                        ⚙️ Trang Quản Trị (Admin)
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={onLogout} className="py-2 text-danger fw-bold">
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

            <Nav.Link as="div" onClick={handleGoHome} className="fw-bold text-dark py-3" style={{ cursor: 'pointer' }}>
              Trang chủ
            </Nav.Link>

            {/* SẢN PHẨM & MEGA MENU */}
            <div
              className="d-flex align-items-center"
              style={{ padding: '12px 0' }}
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <span className="fw-bold text-danger py-1" style={{ cursor: 'pointer' }}>
                SẢN PHẨM ▾
              </span>

              {showMegaMenu && (
                <div
                  className="position-absolute start-0 w-100 bg-white shadow-lg p-4 border rounded-bottom"
                  style={{ top: '100%', zIndex: 1050, borderTop: '3px solid #dc3545', marginTop: '0px' }}
                >
                  <Row>
                    <Col md={3}>
                      <h6 className="text-danger fw-bold border-bottom pb-2 mb-3">ĐỒ THỜ CÚNG</h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                        {['Bộ đồ ăn / Bộ thờ', 'Chén, Chén chấm', 'Lộc bình, Bát hương', 'Mâm bồng, Kỷ nước'].map((subItem, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                              onClick={() => {
                                handleSelectCategory('Đồ thờ cúng');
                                setShowMegaMenu(false);
                              }}
                            >
                              {subItem}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Col>

                    <Col md={3}>
                      <h6 className="text-danger fw-bold border-bottom pb-2 mb-3">GỐM SỨ GIA DỤNG & PHONG THỦY</h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { handleSelectCategory('Chum rượu'); setShowMegaMenu(false); }}
                          >
                            🍶 Chum Rượu Bát Tràng
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { handleSelectCategory('Chĩnh gạo'); setShowMegaMenu(false); }}
                          >
                            🌾 Chĩnh Gạo Tài Lộc
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { handleSelectCategory('Chậu cảnh'); setShowMegaMenu(false); }}
                          >
                            🪴 Chậu Cảnh Nghệ Thuật
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none p-0 text-start border-0"
                            onClick={() => { handleSelectCategory('Đồ phong thủy'); setShowMegaMenu(false); }}
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

            <Nav.Link as="div" onClick={() => handleSelectCategory('Đồ thờ cúng')} className="text-dark py-3" style={{ cursor: 'pointer' }}>
              Đồ Thờ Cúng
            </Nav.Link>
            <Nav.Link as="div" onClick={() => handleSelectCategory('Đồ phong thủy')} className="text-dark py-3" style={{ cursor: 'pointer' }}>
              Đồ Phong Thủy
            </Nav.Link>
            <Nav.Link as="div" onClick={() => handleSelectCategory('Gốm sứ tâm linh')} className="text-dark py-3" style={{ cursor: 'pointer' }}>
              Tâm Linh
            </Nav.Link>
          </Nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;