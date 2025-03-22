import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main';
import MyArticlesPage from './pages/mypage/article-list/article-list';
import ArticlePage from './pages/article/article';
import HistoryPage from './pages/mypage/history/history';
import CreateArticlePage from './pages/create-article/create-article';

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
    </BrowserRouter>
  );
}

export default App;
