import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Character from "./pages/Character";
import Comics from "./pages/Comics";

function App() {
  const [searchCharacter, setSearchCharacter] = useState("");
  const [searchComics, setSearchComics] = useState("");

  return (
    <>
      <Router>
        <div className="app">
          <div className="container">
            <Header
              setSearchCharacter={setSearchCharacter}
              setSearchComics={setSearchComics}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchCharacter={searchCharacter}
                    setSearchCharacter={setSearchCharacter}
                  />
                }
              />
              <Route
                path="/comics"
                element={
                  <Comics
                    searchComics={searchComics}
                    setSearchComics={setSearchComics}
                  />
                }
              />
              <Route path="/character/:characterId" element={<Character />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
