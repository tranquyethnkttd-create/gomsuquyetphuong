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
            {/* SVG LOGO CHUẨN THEO MẪU QUYẾT PHƯƠNG GỐM SỨ BÁT TRÀNG */}
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

              {/* Nền tròn đỏ đô đậm */}
              <circle cx="100" cy="100" r="96" fill="url(#bgGrad)" />

              {/* Vòng viền vàng ngoài cùng */}
              <circle cx="100" cy="100" r="92" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />

              {/* Vòng viền vàng trong */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />

              {/* Vòng nét đứt sang trọng */}
              <circle cx="100" cy="100" r="76" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="4 3" />

              {/* Biểu tượng Hoa Sen 3 Cánh */}
              {/* Cánh giữa */}
              <path d="M 100 45 C 80 70 85 105 100 112 C 115 105 120 70 100 45 Z" fill="url(#goldGrad)" />

              {/* Cánh trái */}
              <path d="M 100 112 C 70 100 55 65 72 56 C 88 50 96 80 100 112 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />

              {/* Cánh phải */}
              <path d="M 100 112 C 130 100 145 65 128 56 C 112 50 104 80 100 112 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />

              {/* Đế đệm hình thuyền dưới hoa sen */}
              <path d="M 76 116 Q 100 132 124 116 Q 100 126 76 116 Z" fill="url(#goldGrad)" />

              {/* Text: QUYẾT PHƯƠNG */}
              <text x="100" y="148" textAnchor="middle" fill="url(#goldGrad)" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="900" letterSpacing="1">
                QUYẾT PHƯƠNG
              </text>

              {/* Text: GỐM SỨ BÁT TRÀNG */}
              <text x="100" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="1.5">
                GỐM SỨ BÁT TRÀNG
              </text>

              {/* Chấm tròn phong thủy phía dưới */}
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