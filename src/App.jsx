import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Adventure from './pages/Adventure';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventures" element={<Adventure />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin/create-blog" element={<CreateBlog />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
