import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext'; // 🔒 Auth disabled
import { UIProvider } from './context/UIContext';
import Layout from './components/Layout';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import ScanListPage from './pages/ScanListPage';
import CreateScanPage from './pages/CreateScanPage';
import ScanDetailPage from './pages/ScanDetailPage';
import SystemPage from './pages/SystemPage';
// import LoginPage from './pages/LoginPage';

// -----------------------------------------------------------------------------
// 🔒 ProtectedRoute and PublicRoute simplified to bypass authentication
// -----------------------------------------------------------------------------
const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, loading } = useAuth();
  // bypass auth for now
  return children;
};

const PublicRoute = ({ children }) => {
  // const { isAuthenticated, loading } = useAuth();
  // bypass auth for now
  return children;
};

// -----------------------------------------------------------------------------
// App Content
// -----------------------------------------------------------------------------
const AppContent = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                {/* <LoginPage /> */}
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/scans"
            element={
              <ProtectedRoute>
                <Layout>
                  <ScanListPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-scan"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateScanPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/scans/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ScanDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/system"
            element={
              <ProtectedRoute>
                <Layout>
                  <SystemPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/health"
            element={
              <ProtectedRoute>
                <Layout>
                  <SystemPage />
                </Layout>
              </ProtectedRoute>
            }
          /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Toast />
    </div>
  );
};

// -----------------------------------------------------------------------------
// App wrapper
// -----------------------------------------------------------------------------
function App() {
  return (
    <UIProvider>
      {/* <AuthProvider> 🔒 Auth disabled */}
        <AppContent />
      {/* </AuthProvider> */}
    </UIProvider>
  );
}

export default App;
