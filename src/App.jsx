import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Contact from './components/contact'
import Footer from './components/footer'
import Menu from './components/menu'
import Navbar from './components/navBar'
import Admin from './components/Admin.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Menu id="menu" /> 
            <Contact id="contact" /> 
            <Footer id="footer" />
          </>
        } />
      
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App