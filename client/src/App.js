import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main';
import MyArticlesPage from './pages/mypage/article-list/article-list';
import ArticlePage from './pages/article/article';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/my/articles" element={<MyArticlesPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
