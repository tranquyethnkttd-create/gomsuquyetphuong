import React from 'react';
import { Container, Navbar, Nav, Form, Button, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import Logo from './Logo';

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
  setIsAdminView
}) {
  const handleCategoryClick = (category) => {
    setSelectedProductId(null);
    if (setIsAdminView) setIsAdminView(false);
    setSelectedCategory(category);
  };

  return (
    <>
      {/* 1. Top Bar */}
      <div className="bg-dark text-warning py-1 border-bottom border-warning border-opacity-25" style={{ fontSize: '12px' }}>
        <Container className="d-flex justify-content-between align-items-center">
          <span>✨ Tinh Hoa Gốm Sứ Việt - Đẳng Cấp & Tâm Linh</span>
          <span>📞 Hotline/Zalo: <strong>0913 767 574</strong></span>
        </Container>
      </div>

      {/* 2. Main Header */}
      <Navbar expand="xl" variant="dark" style={{ backgroundColor: '#4a0e0e' }} sticky="top" className="shadow-sm py-2">
        <Container fluid="xxl" className="d-flex align-items-center justify-content-between">

          {/* LOGO BRAND */}
          <Navbar.Brand
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick('Tất cả');
            }}
            className="fw-bold fs-5.5 text-uppercase m-0 p-0 d-flex align-items-center text-white"
            style={{ letterSpacing: '0.5px', lineHeight: '1.2' }}
          >
            <Logo width={40} height={40} className="me-2" />
            <div>
              Gốm Sứ QUYẾT PHƯƠNG
              <span className="d-block text-warning fw-semibold" style={{ fontSize: '8px', letterSpacing: '0.5px' }}>
                ĐỒ THỜ - ĐỒ PHONG THỦY - GỐM SỨ TÂM LINH
              </span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="mt-2 mt-xl-0">

            {/* THANH TÌM KIẾM */}
            <Form onSubmit={(e) => e.preventDefault()} className="mx-auto my-2 my-xl-0" style={{ maxWidth: '300px', width: '100%' }}>
              <InputGroup size="sm">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm đồ thờ, lộc bình..."
                  className="bg-white border-0 px-3 shadow-none"
                  style={{ height: '36px', fontSize: '13px', borderRadius: '6px 0 0 6px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="warning"
                  className="px-3 border-0 fw-bold d-flex align-items-center justify-content-center"
                  style={{ height: '36px', borderRadius: '0 6px 6px 0' }}
                >
                  🔍
                </Button>
              </InputGroup>
            </Form>

            {/* MENU NAVIGATION */}
            <Nav className="mx-auto align-items-center gap-1 gap-xxl-2">
              <Nav.Link
                href="#all"
                style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
                className="text-white px-2 fw-medium"
                onClick={(e) => { e.preventDefault(); handleCategoryClick('Tất cả'); }}
              >
                Trang chủ
              </Nav.Link>
              <Nav.Link
                href="#dotho"
                style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
                className="text-white px-2 fw-medium"
                onClick={(e) => { e.preventDefault(); handleCategoryClick('Đồ thờ cúng'); }}
              >
                Đồ Thờ Cúng
              </Nav.Link>
              <Nav.Link
                href="#phongthuy"
                style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
                className="text-white px-2 fw-medium"
                onClick={(e) => { e.preventDefault(); handleCategoryClick('Đồ phong thủy'); }}
              >
                Đồ Phong Thủy
              </Nav.Link>
              <Nav.Link
                href="#tamlinh"
                style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
                className="text-white px-2 fw-medium"
                onClick={(e) => { e.preventDefault(); handleCategoryClick('Gốm sứ tâm linh'); }}
              >
                Tâm Linh
              </Nav.Link>

              {/* Tab Admin */}
              {currentUser?.role === 'admin' && (
                <Nav.Link
                  href="#admin"
                  style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
                  className="text-warning px-2 fw-bold d-flex align-items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProductId(null);
                    if (setIsAdminView) setIsAdminView(true);
                  }}
                >
                  ⚙️ Quản Lý
                </Nav.Link>
              )}
            </Nav>

            {/* NÚT GIỎ HÀNG & USER */}
            <div className="d-flex align-items-center gap-2 ms-auto">

              {/* Giỏ hàng */}
              <Button
                variant="warning"
                size="sm"
                className="fw-bold border-0 d-flex align-items-center gap-2 px-3"
                style={{ height: '36px', borderRadius: '6px' }}
                onClick={() => setShowCart(true)}
              >
                🛒 <span style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>Giỏ hàng</span>
                <Badge bg="danger" className="rounded-pill fs-7">
                  {totalCartCount || 0}
                </Badge>
              </Button>

              {/* Account Dropdown */}
              {currentUser ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-light"
                    size="sm"
                    className="border-0 px-2 fw-semibold d-flex align-items-center gap-1"
                    style={{ height: '36px' }}
                  >
                    👤 <span style={{ fontSize: '13px' }}>{currentUser.fullName || currentUser.username}</span>
                    {currentUser.role === 'admin' && <Badge bg="warning" text="dark" style={{ fontSize: '10px' }}>Admin</Badge>}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow border-0 mt-2">
                    <Dropdown.Item onClick={onLogout} className="text-danger fw-semibold" style={{ fontSize: '13px' }}>
                      🚪 Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="fw-semibold px-3"
                  style={{ height: '36px', borderRadius: '6px', fontSize: '13px', whiteSpace: 'nowrap' }}
                  onClick={onOpenAuth}
                >
                  🔑 Đăng Nhập
                </Button>
              )}

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;