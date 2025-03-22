import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import MainPage from './pages/main/main';
import MyArticlesPage from './pages/mypage/article-list/article-list';
import ArticlePage from './pages/article/article';
import HistoryPage from './pages/mypage/history/history';
import CreateArticlePage from './pages/create-article/create-article';

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
      <Route path="/my/articles" element={<MyArticlesPage />} />
      <Route path="/my/history" element={<HistoryPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/create/article" element={<CreateArticlePage />} />
     </Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage />} />
        <Route path="/advertise/:id" element={<AdvertisementDetailPage />} />
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
    </BrowserRouter>
  );
}

export default App;