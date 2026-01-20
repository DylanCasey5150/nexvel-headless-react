import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className="header">
          <div className="brand">
            <div className="brand__title">Nexvel Headless Demo</div>
            <div className="brand__subtitle">React + WordPress (ACF) via REST</div>
          </div>

          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
              Services
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </nav>
        </header>

        <hr className="rule" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="footer">
          Demo project: headless WordPress (CPT + ACF) powering a React front end.
        </footer>
      </div>
    </BrowserRouter>
  );
}