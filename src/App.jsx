import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import ClientStories from './pages/ClientStories'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import { FavouritesProvider } from './context/FavouritesContext'

function App() {
  return (
    <FavouritesProvider>
      <Router>
        <ScrollToTop />
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/client-stories" element={<ClientStories />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavouritesProvider>
  )
}

export default App
