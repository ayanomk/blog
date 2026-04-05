import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Adventure from './pages/Adventure';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './pages/Error';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adventures" element={<Adventure />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/admin/login" element={<Login />} />
          {/* <Route path='/somethingwentwrong' element={<Error />} /> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/create-blog" element={<CreateBlog isEdit={false} />} />
            <Route path="/admin/blogs/:id/edit" element={<CreateBlog isEdit={true} />} />
          </Route>
        </Routes>

        <Footer />

      </div>

    </>
  )
}

export default App
