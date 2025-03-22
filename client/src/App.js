import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import MainPage from './pages/main/main';

import LoginPage from './pages/login/login';
import SingUpPage from './pages/signup/signup';
import TokenBuyPage from './pages/tokenbuy/tokenbuy';
import WalletGenPage from './pages/walletgen/walletgen';

import AdvertisementDetailPage from './pages/avertisement/AdvertisementDetailPage';

import AdvertiseRegisterPage from './pages/advertiseregister/AdvertiseRegisterPage';



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage />} />

        <Route path="/advertise/:id" element={<AdvertisementDetailPage />} />

        {/* 로그인되지 않은 경우 접근할 수 없는 페이지 */}
    
        <Route path="/advertise/create" element={
          <ProtectedRoute>
            <AdvertiseRegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/token/buy" element={
          <ProtectedRoute>
            <TokenBuyPage />
          </ProtectedRoute>
        } />
        <Route path="/wallet/create" element={
          <ProtectedRoute>
            <WalletGenPage />
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;