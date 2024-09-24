// Extensões react
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

// Rotas
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";

// Layouts
import Container from "./components/layouts/Container";
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass='minHeight'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/newproject" element={<NewProject />} />
          <Route exact path="/projects" element={<Projects />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
