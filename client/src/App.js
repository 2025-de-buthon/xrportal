import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main';
import MyArticlesPage from './pages/mypage/article-list/article-list';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/my/articles" element={<MyArticlesPage />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
