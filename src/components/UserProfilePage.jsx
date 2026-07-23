import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Form, Button, InputGroup, Modal } from 'react-bootstrap';

function UserProfilePage({ currentUser, orders = [], onBackToHome, onUpdateUser }) {
    // State quản lý tab đang được chọn ở Sidebar ('profile' | 'orders' | 'address')
    const [activeTab, setActiveTab] = useState('profile');

    // State quản lý tab lọc đơn hàng ở bên phải ('all', 'pay', 'ship', v.v.)
    const [setOrderTab] = useState('all');

    const [userInfo, setUserInfo] = useState({
        username: currentUser?.username || currentUser?.email?.split('@')[0] || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        address: currentUser?.address || ''
    });

    // State cho Modal cập nhật địa chỉ
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressForm, setAddressForm] = useState({
        username: '',
        phone: '',
        address: ''
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (onUpdateUser) {
            onUpdateUser({
                ...currentUser,
                username: userInfo.username,
                email: userInfo.email,
                phone: userInfo.phone
            });
        }
        alert('Cập nhật hồ sơ tài khoản thành công!');
    };

    const handleOpenAddressModal = () => {
        setAddressForm({
            username: userInfo.username,
            phone: userInfo.phone,
            address: userInfo.address
        });
        setShowAddressModal(true);
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        setUserInfo(prev => ({
            ...prev,
            username: addressForm.username,
            phone: addressForm.phone,
            address: addressForm.address
        }));
        if (onUpdateUser) {
            onUpdateUser({
                ...currentUser,
                username: addressForm.username,
                phone: addressForm.phone,
                address: addressForm.address
            });
        }
        setShowAddressModal(false);
        alert('Cập nhật địa chỉ nhận hàng thành công!');
    };

    return (
        <Container className="my-4">
            <Row>
                {/* SIDEBAR BÊN TRÁI */}
                <Col lg={3} className="mb-4">
                    <Card className="border-0 shadow-sm p-3">
                        <div className="d-flex align-items-center gap-3 pb-3 border-bottom mb-3">
                            <div
                                className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4"
                                style={{ width: '50px', height: '50px' }}
                            >
                                {userInfo.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-truncate">
                                <h6 className="fw-bold mb-0 text-truncate">{userInfo.email}</h6>
                                <small
                                    className="text-muted cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    ✏️ Chỉnh sửa hồ sơ
                                </small>
                            </div>
                        </div>

                        {/* Các nút bấm Sidebar */}
                        <Nav variant="pills" className="flex-column gap-1">
                            <Nav.Link
                                active={activeTab === 'profile'}
                                onClick={() => setActiveTab('profile')}
                                className="fw-semibold text-start d-flex align-items-center gap-2 cursor-pointer"
                                style={{ cursor: 'pointer' }}
                            >
                                👤 Tài Khoản Của Tôi
                            </Nav.Link>
                            <Nav.Link
                                active={activeTab === 'orders'}
                                onClick={() => setActiveTab('orders')}
                                className="fw-semibold text-start d-flex align-items-center gap-2 cursor-pointer"
                                style={{ cursor: 'pointer' }}
                            >
                                📋 Đơn Mua
                            </Nav.Link>
                            <Nav.Link
                                active={activeTab === 'address'}
                                onClick={() => setActiveTab('address')}
                                className="fw-semibold text-start d-flex align-items-center gap-2 cursor-pointer"
                                style={{ cursor: 'pointer' }}
                            >
                                📍 Địa Chỉ Giao Hàng
                            </Nav.Link>

                            <Button
                                variant="outline-secondary"
                                size="sm"
                                className="mt-4 text-start"
                                onClick={onBackToHome}
                            >
                                ⬅ Quay lại trang chủ
                            </Button>
                        </Nav>
                    </Card>
                </Col>

                {/* NỘI DUNG CHÍNH BÊN PHẢI (THAY ĐỔI THEO TAB) */}
                <Col lg={9}>
                    {/* TAB 1: TÀI KHOẢN CỦA TÔI */}
                    {activeTab === 'profile' && (
                        <Card className="border-0 shadow-sm p-4">
                            <h5 className="fw-bold border-bottom pb-3 mb-4">Hồ Sơ Của Tôi</h5>
                            <p className="text-muted small">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            <Form onSubmit={handleSaveProfile}>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3 col-form-label text-end fw-semibold">Tên đăng nhập</Form.Label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" value={userInfo.username} onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} className="fw-bold" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3 col-form-label text-end fw-semibold">Email</Form.Label>
                                    <div className="col-sm-9">
                                        <Form.Control type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Form.Label className="col-sm-3 col-form-label text-end fw-semibold">Số điện thoại</Form.Label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
                                    </div>
                                </Form.Group>
                                <div className="row mt-4">
                                    <div className="col-sm-9 offset-sm-3">
                                        <Button type="submit" variant="danger" className="px-4 fw-bold">Lưu Thay Đổi</Button>
                                    </div>
                                </div>
                            </Form>
                        </Card>
                    )}

                    {/* TAB 2: ĐƠN MUA (GIỐNG SHOPEE) */}
                    {activeTab === 'orders' && (
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-3">
                                <Nav variant="tabs" defaultActiveKey="all" onSelect={(k) => setOrderTab(k)} className="justify-content-between text-center fw-semibold">
                                    <Nav.Item><Nav.Link eventKey="all" className="text-dark">Tất cả</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="pay" className="text-dark">Chờ thanh toán</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="ship" className="text-dark">Vận chuyển</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="receive" className="text-dark">Chờ giao hàng</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="completed" className="text-dark">Hoàn thành</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="cancelled" className="text-dark">Đã hủy</Nav.Link></Nav.Item>
                                </Nav>
                            </Card.Header>

                            <Card.Body>
                                <InputGroup className="mb-4">
                                    <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
                                    <Form.Control className="bg-light border-start-0" placeholder="Bạn có thể tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm" />
                                </InputGroup>

                                {/* Khối đơn hàng mẫu */}
                                <div className="border rounded p-3 mb-3 bg-white shadow-sm">
                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                                        <span className="fw-bold text-danger">🏪 Gốm Sứ Quyết Phương</span>
                                        <span className="text-danger fw-bold text-uppercase small">Đang xử lý</span>
                                    </div>

                                    <div className="d-flex gap-3 align-items-center mb-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=100"
                                            alt="product"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            className="rounded border"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1 fw-bold">Bộ Đồ Thờ Men Rạn Hoa Sen Cao Cấp Bát Tràng</h6>
                                            <p className="text-muted small mb-0">Phân loại: Dành cho Căn Hộ Chung Cư (Bộ 15 món)</p>
                                            <small>x1</small>
                                        </div>
                                        <div className="text-end">
                                            <span className="text-muted text-decoration-line-through small me-2">5.500.000 đ</span>
                                            <span className="text-danger fw-bold fs-5">3.799.000 đ</span>
                                        </div>
                                    </div>

                                    <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                                        <span className="text-muted small">Tự động xử lý bởi hệ thống</span>
                                        <div>
                                            <span className="me-2">Thành tiền: <strong className="text-danger fs-4">3.799.000 đ</strong></span>
                                            <Button variant="danger" className="ms-2 fw-semibold">Mua Lại</Button>
                                            <Button variant="outline-secondary" className="ms-2">Liên Hệ Shop</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                     {/* TAB 3: ĐỊA CHỈ GIAO HÀNG */}
                    {activeTab === 'address' && (
                        <Card className="border-0 shadow-sm p-4">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                                <h5 className="fw-bold m-0">Địa Chỉ Của Tôi</h5>
                                <Button variant="danger" size="sm" className="fw-bold" onClick={handleOpenAddressModal}>+ Thêm địa chỉ mới</Button>
                            </div>
                            <div className="p-3 border rounded mb-3 bg-light d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <strong className="text-dark">{userInfo.username || 'Chưa nhập tên'}</strong>
                                        <span className="text-muted">|</span>
                                        <span className="text-muted">{userInfo.phone || 'Chưa có SĐT'}</span>
                                    </div>
                                    <p className="text-muted small mb-0">{userInfo.address || 'Chưa cập nhật địa chỉ giao hàng'}</p>
                                </div>
                                <div>
                                    <Button variant="link" className="text-primary p-0 me-2 text-decoration-none" onClick={handleOpenAddressModal}>Cập nhật</Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* MODAL CẬP NHẬT ĐỊA CHỈ */}
                    <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title className="fw-bold fs-5">Cập Nhật Địa Chỉ Nhận Hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSaveAddress}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Họ và tên người nhận</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập họ tên người nhận hàng"
                                        value={addressForm.username}
                                        onChange={(e) => setAddressForm({ ...addressForm, username: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập số điện thoại liên hệ"
                                        value={addressForm.phone}
                                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Địa chỉ chi tiết</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                        value={addressForm.address}
                                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
                                        Hủy
                                    </Button>
                                    <Button type="submit" variant="danger" className="fw-bold">
                                        Lưu Địa Chỉ
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfilePage;