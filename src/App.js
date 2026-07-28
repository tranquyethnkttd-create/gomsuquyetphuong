import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Table, Badge, Form, Modal } from 'react-bootstrap';

// Import các components con
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import CartPage from './components/CartPage';
import AuthModal from './components/AuthModal';
import UserProfilePage from './components/UserProfilePage';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);

  // State danh sách đơn hàng cho Admin quản lý
  const [orders, setOrders] = useState([]);
  const [orderFilterStatus, setOrderFilterStatus] = useState('Tất cả');

  // State Modal Thêm/Sửa sản phẩm cho Admin
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    id: '',
    name: '',
    category: 'Đồ thờ cúng',
    price: 0,
    image: '',
    description: ''
  });

  // 🎯 Lấy user đã lưu trong localStorage khi vừa mở App
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🎯 State lưu sản phẩm đang chờ thêm (nếu bắt đăng nhập trước)
  const [pendingProduct, setPendingProduct] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);

  // Tải danh sách sản phẩm từ database.json hoặc json-server
  useEffect(() => {
    setLoading(true);
    fetch('/database.json')
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải dữ liệu từ database.json');
        return res.json();
      })
      .then(data => {
        const productList = Array.isArray(data) ? data : (data.products || []);
        setProducts(productList);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Tải danh sách đơn hàng từ json-server khi Admin truy cập
  const fetchOrders = () => {
    fetch('http://localhost:3001/orders')
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(err => console.error('Chưa thể lấy danh sách đơn hàng từ json-server:', err));
  };

  useEffect(() => {
    if (isAdminView) {
      fetchOrders();
    }
  }, [isAdminView]);

  // Hàm chuyển sang trang Admin an toàn
  const handleGoToAdmin = () => {
    setIsUserPage(false);
    setIsCartPage(false);
    setSelectedProductId(null);
    setIsAdminView(true);
  };

  // Cập nhật trạng thái đơn hàng (Admin)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => {
        if (res.ok) {
          setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } else {
          // Fallback cập nhật ở giao diện nếu server không response PATCH
          setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
      })
      .catch(() => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      });
  };

  // Mở Modal Thêm/Sửa sản phẩm
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductFormData({ ...product });
    } else {
      setEditingProduct(null);
      setProductFormData({
        id: `SP-${Date.now()}`,
        name: '',
        category: 'Đồ thờ cúng',
        price: 0,
        image: '',
        description: ''
      });
    }
    setShowProductModal(true);
  };

  // Lưu Sản phẩm (Thêm mới hoặc Cập nhật)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...productFormData, price: Number(productFormData.price) } : p));
    } else {
      setProducts(prev => [{ ...productFormData, price: Number(productFormData.price) }, ...prev]);
    }
    setShowProductModal(false);
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    if (window.confirm('Ông có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // 🎯 XỬ LÝ THÊM VÀO GIỎ HÀNG
  const addToCart = (product) => {
    if (!currentUser) {
      setPendingProduct(product);
      setShowAuthModal(true);
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter(order => {
    if (orderFilterStatus === 'Tất cả') return true;
    return (order.status || 'Chờ xác nhận') === orderFilterStatus;
  });

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setShowAuthModal(false);

    if (pendingProduct) {
      addToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    setIsAdminView(false);
    setIsUserPage(false);
    setIsCartPage(false);
  };

  const resetToHome = () => {
    setIsUserPage(false);
    setIsAdminView(false);
    setIsCartPage(false);
    setSelectedProductId(null);
  };

  const renderBadgeStatus = (status) => {
    switch (status) {
      case 'Đã xác nhận': return <Badge bg="info">Đã xác nhận</Badge>;
      case 'Đang giao': return <Badge bg="primary">Đang giao</Badge>;
      case 'Đã giao': return <Badge bg="success">Đã giao</Badge>;
      case 'Đã hủy': return <Badge bg="secondary">Đã hủy</Badge>;
      default: return <Badge bg="warning" text="dark">Chờ xác nhận</Badge>;
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          resetToHome();
        }}
        setSelectedProductId={(id) => {
          resetToHome();
          setSelectedProductId(id);
        }}
        totalCartCount={totalCartCount}
        setShowCart={() => setIsCartPage(true)}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        setIsAdminView={handleGoToAdmin}
        setIsUserPage={(val) => {
          resetToHome();
          setIsUserPage(val);
        }}
      />

      {/* Main Content */}
      <Container className="my-4 flex-grow-1">
        {/* 1. TRANG GIỎ HÀNG */}
        {isCartPage ? (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
            setCart={setCart}
            onBackToHome={() => setIsCartPage(false)}
            currentUser={currentUser}
          />
        ) : isUserPage ? (
          /* 2. TRANG USER PROFILE */
          <UserProfilePage
            currentUser={currentUser}
            orders={cart}
            onBackToHome={() => setIsUserPage(false)}
          />
        ) : isAdminView ? (
          /* 3. TRANG ADMIN: QUẢN LÝ ĐƠN HÀNG & SẢN PHẨM */
          <div className="d-flex flex-column gap-4">
            {/* QUẢN LÝ ĐƠN HÀNG SHIP */}
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h3 className="text-danger fw-bold m-0">📦 Danh Sách Đơn Hàng Cần Ship</h3>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold text-muted">Lọc trạng thái:</span>
                  <Form.Select
                    style={{ width: '180px' }}
                    value={orderFilterStatus}
                    onChange={(e) => setOrderFilterStatus(e.target.value)}
                  >
                    <option value="Tất cả">Tất cả đơn hàng</option>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </Form.Select>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="text-muted text-center py-4">Chưa có đơn hàng nào thuộc trạng thái này.</p>
              ) : (
                <Table striped bordered hover responsive align="middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Mã đơn</th>
                      <th>Thời gian</th>
                      <th>Khách hàng</th>
                      <th>SĐT</th>
                      <th>Địa chỉ giao hàng</th>
                      <th>Sản phẩm mua</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="fw-bold">#{order.id}</td>
                        <td style={{ fontSize: '0.85rem' }}>{order.createdAt}</td>
                        <td className="fw-semibold">{order.customerName}</td>
                        <td className="text-primary fw-bold">{order.phone}</td>
                        <td>{order.address}</td>
                        <td>
                          <ul className="mb-0 ps-3">
                            {order.items?.map((item, idx) => (
                              <li key={idx}>
                                {item.name} <strong className="text-danger">x{item.quantity}</strong>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="text-danger fw-bold">
                          {typeof order.totalAmount === 'number'
                            ? order.totalAmount.toLocaleString('vi-VN') + ' đ'
                            : order.totalAmount}
                        </td>
                        <td>{renderBadgeStatus(order.status)}</td>
                        <td>
                          <Form.Select
                            size="sm"
                            value={order.status || 'Chờ xác nhận'}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Đã xác nhận">Đã xác nhận</option>
                            <option value="Đang giao">Đang giao</option>
                            <option value="Đã giao">Đã giao</option>
                            <option value="Đã hủy">Đã hủy</option>
                          </Form.Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>

            {/* QUẢN LÝ SẢN PHẨM */}
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-danger fw-bold m-0">⚙️ Quản Lý Danh Sách Sản Phẩm</h3>
                <Button
                  variant="success"
                  className="fw-semibold"
                  onClick={() => handleOpenProductModal()}
                >
                  + Thêm Sản Phẩm Mới
                </Button>
              </div>
              <Table striped bordered hover responsive align="middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá bán</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <img
                          src={p.image || 'https://via.placeholder.com/50'}
                          alt={p.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded border"
                        />
                      </td>
                      <td className="fw-semibold">{p.name}</td>
                      <td>{p.category}</td>
                      <td className="text-danger fw-bold">
                        {typeof p.price === 'number' ? p.price.toLocaleString('vi-VN') + ' đ' : p.price}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2 fw-semibold"
                          onClick={() => handleOpenProductModal(p)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="fw-semibold"
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : loading ? (
          <div className="text-center py-5">
            <h3>⏳ Đang tải dữ liệu sản phẩm...</h3>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <h3>❌ Lỗi kết nối API: {error}</h3>
          </div>
        ) : !selectedProductId ? (
          /* 4. TRANG CHỦ & DANH SÁCH SẢN PHẨM */
          <>
            {/* Banner Section */}
            <div className="p-5 mb-4 text-white rounded-3 shadow" style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200") center/cover' }}>
              <Container fluid className="py-3 text-center">
                <h1 className="display-5 fw-bold text-warning">Tuyệt Tác Gốm Sứ Tâm Linh</h1>
                <p>Nâng tầm không gian sống & thờ tự với chất liệu men cao cấp, chế tác thủ công tinh xảo.</p>
              </Container>
            </div>

            {/* Brand Values */}
            <Row className="mb-4 text-center g-3">
              <Col md={4}>
                <Card className="h-100 border-0 shadow-sm p-3">
                  <h5 className="text-danger fw-bold">🏆 Chuẩn Làng Nghề</h5>
                  <p className="text-muted mb-0">Chế tác tinh xảo từng chi tiết</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 border-0 shadow-sm p-3">
                  <h5 className="text-danger fw-bold">📦 Vận Chuyển An Toàn</h5>
                  <p className="text-muted mb-0">Đóng gói xốp bọc 100% không vỡ</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 border-0 shadow-sm p-3">
                  <h5 className="text-danger fw-bold">🤝 Tư Vấn Tâm Linh</h5>
                  <p className="text-muted mb-0">Hỗ trợ sắp xếp chuẩn phong thủy</p>
                </Card>
              </Col>
            </Row>

            {/* Category Filter Pills */}
            <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
              {['Tất cả', 'Đồ thờ cúng', 'Chum rượu', 'Chĩnh gạo', 'Chậu cảnh', 'Đồ phong thủy', 'Gốm sứ tâm linh'].map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'danger' : 'outline-danger'}
                  className="rounded-pill px-3 fw-semibold"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Product Grid */}
            <h3 className="text-center text-danger mb-4 fw-bold border-bottom pb-2">SẢN PHẨM NỔI BẬT</h3>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {filteredProducts.map(p => (
                <Col key={p.id}>
                  <ProductCard
                    product={p}
                    setSelectedProductId={setSelectedProductId}
                    addToCart={addToCart}
                    cart={cart}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          /* 5. TRANG CHI TIẾT SẢN PHẨM */
          selectedProduct && (
            <ProductDetail
              selectedProduct={selectedProduct}
              setSelectedProductId={setSelectedProductId}
              addToCart={addToCart}
            />
          )
        )}
      </Container>

      {/* Cart Drawer (Dạng trượt) */}
      <CartDrawer
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        removeFromCart={removeFromCart}
        setCart={setCart}
      />

      {/* Modal Đăng nhập / Đăng ký */}
      <AuthModal
        show={showAuthModal}
        onHide={() => {
          setShowAuthModal(false);
          setPendingProduct(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Modal Thêm / Sửa Sản Phẩm (Admin) */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>{editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveProduct}>
          <Modal.Body className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label className="fw-semibold">Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                required
                value={productFormData.name}
                onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-semibold">Danh mục</Form.Label>
              <Form.Select
                value={productFormData.category}
                onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
              >
                <option value="Đồ thờ cúng">Đồ thờ cúng</option>
                <option value="Chum rượu">Chum rượu</option>
                <option value="Chĩnh gạo">Chĩnh gạo</option>
                <option value="Chậu cảnh">Chậu cảnh</option>
                <option value="Đồ phong thủy">Đồ phong thủy</option>
                <option value="Gốm sứ tâm linh">Gốm sứ tâm linh</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-semibold">Giá bán (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                required
                value={productFormData.price}
                onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-semibold">Đường dẫn ảnh (URL / Local Path)</Form.Label>
              <Form.Control
                type="text"
                placeholder="/images/dotho.jpg"
                value={productFormData.image}
                onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-semibold">Mô tả sản phẩm</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productFormData.description}
                onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProductModal(false)}>Hủy</Button>
            <Button variant="danger" type="submit">Lưu Sản Phẩm</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;