import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function AuthModal({ show, onHide, onLoginSuccess }) {
    const [isRegister, setIsRegister] = useState(false); // Switch giữa Login & Register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (isRegister) {
            // Giả lập Đăng ký thành công (Default vai trò là user)
            const newUser = { username, fullName: fullName || username, role: 'user' };
            alert('Đăng ký tài khoản thành công!');
            onLoginSuccess(newUser);
            onHide();
        } else {
            // Giả lập Đăng nhập (Mẫu tài khoản Admin & User)
            if (username === 'admin' && password === 'admin123') {
                onLoginSuccess({ username: 'admin', fullName: 'Quản Trị Viên', role: 'admin' });
                onHide();
            } else if (password) {
                onLoginSuccess({ username, fullName: username, role: 'user' });
                onHide();
            } else {
                setError('Tài khoản hoặc mật khẩu không chính xác!');
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>{isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    {isRegister && (
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Tên đăng nhập / Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100 fw-bold">
                        {isRegister ? 'Tạo Tài Khoản' : 'Đăng Nhập'}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <small>
                        {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
                        <span
                            className="text-danger fw-bold cursor-pointer"
                            style={{ cursor: 'pointer' }}
                            onClick={() => { setIsRegister(!isRegister); setError(''); }}
                        >
                            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký mới'}
                        </span>
                    </small>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AuthModal;