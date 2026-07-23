import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Tab, Button, Form, Table, Badge } from 'react-bootstrap';

function UserProfileModal({ show, onHide, currentUser, orders = [] }) {
    const [activeTab, setActiveTab] = useState('info');

    // Khởi tạo state rỗng, không hardcode giá trị mặc định nữa
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        phone: '',
        address: ''
    });

    // 🎯 FIX LỖI: Đồng bộ state userInfo mỗi khi currentUser hoặc modal mở lên
    useEffect(() => {
        if (currentUser) {
            setUserInfo({
                username: currentUser.username || currentUser.name || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '', // Không dán cứng 0913... vào đây nữa
                address: currentUser.address || ''
            });
        }
    }, [currentUser, show]);

    const handleSave = (e) => {
        e.preventDefault();
        alert('Cập nhật thông tin thành công!');
        // Logic lưu thông tin user vào localStorage hoặc gọi API ở đây
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="fw-bold text-danger">Hồ Sơ Khách Hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4 custom-tabs">

                    {/* Tab 1: Thông tin cá nhân */}
                    <Tab eventKey="info" title="👤 Thông tin cá nhân">
                        <Form onSubmit={handleSave}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Tên tài khoản / Họ tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userInfo.username}
                                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Email</Form.Label>
                                <Form.Control type="email" value={userInfo.email} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Chưa có số điện thoại"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="danger" type="submit" className="px-4">Lưu thay đổi</Button>
                        </Form>
                    </Tab>

                    {/* Tab 2: Đơn hàng của tôi */}
                    <Tab eventKey="orders" title="📦 Đơn hàng của tôi">
                        {orders.length === 0 ? (
                            <p className="text-muted text-center py-4">Bạn chưa có đơn hàng nào.</p>
                        ) : (
                            <Table responsive striped bordered hover className="align-middle">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Ngày đặt</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, idx) => (
                                        <tr key={idx}>
                                            <td>#{order.id || idx + 100}</td>
                                            <td>{order.date || 'Hôm nay'}</td>
                                            <td className="fw-bold text-danger">{order.total?.toLocaleString()} đ</td>
                                            <td><Badge bg="warning" text="dark">Đang xử lý</Badge></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Tab>

                    {/* Tab 3: Địa chỉ giao hàng */}
                    <Tab eventKey="address" title="📍 Địa chỉ giao hàng">
                        <div className="border rounded p-3 mb-3 bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fw-bold mb-1">{userInfo.username || 'Khách hàng'} <Badge bg="success" className="ms-2">Mặc định</Badge></h6>
                                    <p className="mb-1 text-muted small">Địa chỉ: {userInfo.address || 'Chưa cập nhật'}</p>
                                    <p className="mb-0 text-muted small">Điện thoại: {userInfo.phone || 'Chưa cập nhật'}</p>
                                </div>
                                <Button variant="outline-dark" size="sm">Chỉnh sửa</Button>
                            </div>
                        </div>
                        <Button variant="outline-danger" size="sm">+ Thêm địa chỉ mới</Button>
                    </Tab>

                </Tabs>
            </Modal.Body>
        </Modal>
    );
}

export default UserProfileModal;