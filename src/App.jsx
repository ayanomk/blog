import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Adventure from './pages/Adventure';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventures" element={<Adventure />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
