import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

// Import các components con
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // States quản lý Auth & Admin
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

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

  const addToCart = (product) => {
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

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setSelectedProductId={setSelectedProductId}
        totalCartCount={totalCartCount}
        setShowCart={setShowCart}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={() => {
          setCurrentUser(null);
          setIsAdminView(false);
        }}
        setIsAdminView={setIsAdminView}
      />

      {/* Main Content */}
      <Container className="my-4 flex-grow-1">
        {/* Màn hình Admin khi đăng nhập bằng quyền Admin */}
        {isAdminView && currentUser?.role === 'admin' ? (
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-danger fw-bold m-0">⚙️ Trang Quản Lý Sản Phẩm (Admin)</h3>
              <Button variant="success" className="fw-semibold">+ Thêm Sản Phẩm Mới</Button>
            </div>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="align-middle">
                    <td>{p.id}</td>
                    <td>
                      <img
                        src={p.image || 'https://via.placeholder.com/50'}
                        alt={p.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    </td>
                    <td className="fw-semibold">{p.name}</td>
                    <td>{p.category}</td>
                    <td className="text-danger fw-bold">{p.price}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2 fw-semibold">Sửa</Button>
                      <Button variant="danger" size="sm" className="fw-semibold">Xóa</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
              {['Tất cả', 'Đồ thờ cúng', 'Đồ phong thủy', 'Gốm sứ tâm linh'].map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'danger' : 'outline-danger'}
                  className="rounded-pill px-4 fw-semibold"
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
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          /* Detailed View */
          selectedProduct && (
            <ProductDetail
              selectedProduct={selectedProduct}
              setSelectedProductId={setSelectedProductId}
              addToCart={addToCart}
            />
          )
        )}
      </Container>

      {/* Cart Drawer */}
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
        onHide={() => setShowAuthModal(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;